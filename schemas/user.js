const mongoose = require('mongoose')
const Schema = mongoose.Schema;
module.exports={
    username: { type:  String, required : true , unique : true  },
    email: { type:  String, required : true , unique : true },
    name: {type : String , required:false},
    profilePic : {type : Schema.Types.ObjectId , ref : 'attachments' },  
    password: String,
    role: String
}