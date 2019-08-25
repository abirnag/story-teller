const express = require('express'); 
const userRouter = express.Router(); 
const userModel = require("../models/users"); 

userRouter.get("/", (req,res)=> {
    res.send({});
}); 

userRouter.post("/" , (req, res)=>{
    userModel.registerUser(req.body, res);  
   
   
});

module.exports= userRouter; 
