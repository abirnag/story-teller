const express = require('express'); 
const storyRouter = express.Router(); 
const storiesModel = require("../models/stories"); 

storyRouter.get("/", (req,res)=> {
    storiesModel.getStories(req,res);
}); 

storyRouter.post("/" , (req, res)=>{
    storiesModel.addStory(req.body, req, res);  
   
   
});

module.exports= storyRouter; 
