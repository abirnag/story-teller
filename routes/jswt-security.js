const jwt = require("jsonwebtoken");
const config = require("../config/config");
const auth = require("basic-auth");
const userModel = require("../models/users");
const publicKey = config.server.security.publicKey;
const privateKey = config.server.security.privateKey;
var signOptions = config.server.security.signinOption;



module.exports = function (req, res, next) {
  //  console.log(req.path+":"+req.method);
    if (!config.notSecureResources.includes(req.path+":"+req.method)) {
        try {
            if(req.headers.authorization == undefined){
                throw new Error("Token is missing");
            }
            const authHeader = req.headers.authorization.split(' ');
            if (authHeader.length == 2) {
                jwt.verify(authHeader[1], publicKey, signOptions, (err, data) => {
                    if (!err) {
                        
                        next();
                    } else {
                        throw new Error('Unauthorized');
                    }
                });


            } else {
                throw new Error("Bearer Token Invalid");
            }
        } catch (error) {
            console.error(error);
            res.status(401).send({
                code: 401,
                status: "Unauthorized"
            });
        }

    }
    else if (req.path == '/api/jwt') {


        try {
            const credentials = auth(req);
            const q = userModel.loggedIn(credentials.name, credentials.pass);
            q.then(function (u) {

                if (u != undefined || u != null) {
                    //console.log(u);
                    const payload = {
                        username: u.username,
                        uid: u._id, 
                        role: u.role
                    };
                    const token = jwt.sign(payload, privateKey, signOptions);
                    const response = {
                        token: token
                    }
                    res.status(200).send(response);
                } else {
                    res.status(403).send({
                        code: 403,
                        status: "Username or Password is incorrect"
                    });
                }
            });

        } catch (error) {
            console.error(error);
            res.status(403).send({
                code: 403,
                status: "Username or Password is incorrect"
            });
        }
    }
    else {
        next();
    }

}; 