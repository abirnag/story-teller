const Schema = require('mongoose').Schema;

module.exports={
    attachmentType : {type: String, default: 'image/jpeg'}, 
    attachmentActualPath: {type: String, required:true}, 
    deleted :{type : Boolean, default:false}
};

