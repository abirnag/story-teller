const express = require('express'); 
const bodyParser = require('body-parser'); 
const cors = require('cors'); 
const helmet = require('helmet'); 
const config = require('./config/config'); 
const jwt = require('./routes/jswt-security'); 
const expreeFileUpload = require('express-fileupload'); 

// Defining App 

const app = express(); 
app.use(cors());
app.use(bodyParser.json()); 
app.use(jwt); 
app.use(helmet()); 
app.use(expreeFileUpload({
    limits: { fileSize: 50 * 1024 * 1024 }, 
    safeFileNames: true
})); 


/**
 * Server Routes  
 */
const userRouter = require('./routes/user'); 
const storyRouter = require("./routes/stories");
const attachmentRouter = require('./routes/attachments');
app.use('/api/users',userRouter); 
app.use('/api/stories', storyRouter);
app.use("/api/attachments",attachmentRouter); 

/*HeathCheck */
app.get("/",(req,res)=>{res.send(200)});

app.listen(config.server.port , (err)=> {
    if(!err){
        console.log('Server is running on '+ config.server.port); 
    }else{
        console.error(err); 
    }
    
}); 

