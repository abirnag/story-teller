const mongoose = require("mongoose");
const config = require('../config/config');
const storySchema = require("../schemas/stories");
const authUtils = require("../config/authUtils"); 
const User = require('./users');
const Schema = mongoose.Schema;

mongoose.connect(config.mongoDb.url, { useNewUrlParser: true, useCreateIndex: true, });
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
    //console.log("connected to database");
});



const StoriesModel = mongoose.model('stories', new Schema(storySchema));

class Story {
    async addStory(storyDocument, req,res) {
      
        try {
            let encPayload = await authUtils.getUser(req); 
            storyDocument.created={};
            storyDocument.created.creatorId = encPayload.uid; 
            //console.log(storyDocument);

            await StoriesModel.create(storyDocument, function (err) {
                
                if (!err) {
                    res.send(
                        {
                            code: 200,
                            status: "Story is created"
                        }
                    );
                }else{
                    res.status(400).send({
                        code: 400, 
                        status : JSON.stringify(err.message)
                    }); 
                }
            });
        } catch (err) {
            res.status(500).send({
                code: 500,
                status: JSON.stringify(err.message)
            });
        }

    }

    async getStories(req, res ){
        const page = parseInt(req.query.page) || 0 ; 
        const limit= parseInt(req.query.limit) || 10; 
        
       await StoriesModel.find().populate({path : 'created.creatorId', select : 'username'}).skip(page*limit).limit(limit).exec((err, allData)=>{
           try{
            if(!err){
                if (allData.length==0){
                    throw new Error("No Stories Found"); 
                }else{
                    let responseBody= new Array(); 
                    allData.forEach( (item)=> {
                    let story = {
                        id: item._id , 
                        title: item.title, 
                        story : item.story, 
                        createdOn : item.created.createdTime, 
                        creator:   item.created.creatorId,
                        likes : item.likes

                    }; 
                    

                   
                        responseBody.push(story); 
                    });
                    res.send(responseBody); 

                }
                

            }else{
                throw err; 
            }
        }catch(err){
            res.status(400).send({
                code : 400, 
                status : err.message
            }); 

        }
       });
    }

}

module.exports = new Story(); 
