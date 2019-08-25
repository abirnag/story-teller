const express = require('express'); 
const attachmentRouter = express.Router(); 
const attachmentModel = require("../models/attachments"); 


attachmentRouter.get("/", (req,res)=>{
    attachmentModel.getAttachment(req, res); 
});

attachmentRouter.post("/" , (req, res)=>{
    attachmentModel.addAttachment(req,res);
   
   
});

module.exports= attachmentRouter; 
