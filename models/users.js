const mongoose = require('mongoose');
const config = require("../config/config");
const userSchema = require('../schemas/user'); 
const CryptoJS = require("crypto-js");

/* Mongo Connection */

const Schema = mongoose.Schema;
mongoose.connect(config.mongoDb.url, { useNewUrlParser: true , useCreateIndex: true, });
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
    console.log("connected to database");
});
/* Mongo Connection */
/* Schema Define */
const userModel = mongoose.model('users', new Schema(userSchema));






class User {


     loggedIn(user, pass) {
        const q =   userModel.findOne({$or : [{ username: user, password: CryptoJS.MD5(pass).toString()}, {email: user, password: CryptoJS.MD5(pass).toString()}]});
        q.select("_id username role");
       // console.log(q.getQuery());
        return q.exec();

    }
    async checkExistingUser(user){
        let exists =false; 
        const q = userModel.findOne({$or : [{username: user.username}, {email: user.email}]}); 
        q.select("username email role");
        await q.exec().then((userData)=>{
            if (userData!=undefined || userData!= null ){
                exists=true; 
            }

        }); 
      
        return exists; 
    }

     async getUser(id){
        let user = null; 
        await userModel.findById(id).then((data)=>{user=data}).catch((err)=>{}); 
       // console.log(user);
        return user; 
    }
     async registerUser(user, res){
        
        let userCreated = false;
        try{
            if( await this.checkExistingUser(user)==true){
                
                throw new Error("User already exists"); 
            }else{
             await userModel.create({
                    username : user.username, 
                    email : user.email, 
                    password : CryptoJS.MD5(user.password).toString(),  
                    role : 'user'
                }, function(err){
                    if(err){
                        throw new Error(err);
                    }else{
                        userCreated=true;
                        const response = {
                            code : 201, 
                            status : "User is created "
                        }
                        res.send(response); 
                    }
                });  
            }
        }catch(err){
            res.status(400).send(
                {
                    code : 400, 
                    status: err.message 
                }
            );
        }
        
    }
}


module.exports = new User(); 