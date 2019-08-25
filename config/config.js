const fs = require("fs"); 
var privateKEY  = fs.readFileSync(__dirname+'/private.key', 'utf8');
var publicKEY  = fs.readFileSync(__dirname+'/public.key', 'utf8');


module.exports=  {
    server:{
        port:  process.env.PORT || $PORT || 4000, 
        security : {
            privateKey : privateKEY , 
            publicKey  : publicKEY, 
            signinOption:{
                issuer:  "StoryTeller",
                subject:  "Security Token",
                audience:  "https://somenath.herokuapp.com",
                expiresIn:  "12h",
                algorithm:  "RS256"
               },
        }
    }, 
    fileUpload: {
        tempDir : "/tmp/", 
        permanentDir : "/home/abir/uploads"

    }, 
    mongoDb: {
        url : "mongodb://root:welcome1@ds221645.mlab.com:21645/storyteller"
    }, 
    notSecureResources: ['/api/jwt:GET', '/api/users:GET', '/api/users:POST','/api/stories:GET',  '/api/attachments:GET']
}
