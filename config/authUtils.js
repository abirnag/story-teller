const jwt = require("jsonwebtoken");
const config = require("../config/config");
const auth = require("basic-auth");
const userModel = require("../models/users");
const publicKey = config.server.security.publicKey;
const privateKey = config.server.security.privateKey;
var signOptions = config.server.security.signinOption;



class AuthUtils {
    async getUser(req) {
        let user = null; 
        try {
            if (req.headers.authorization == undefined) {
                throw new Error("Token is missing");
            }
            const authHeader = req.headers.authorization.split(' ');
            if (authHeader.length == 2) {
                await jwt.verify(authHeader[1], publicKey, signOptions, (err, data) => {
                    if (!err) {
                        user = data; 
                    } else {
                        throw new Error('Unauthorized');
                    }
                });


            } else {
                throw new Error("Bearer Token Invalid");
            }
            return user; 
        } catch (error) {
            return user; 
        }


    }
}

module.exports= new AuthUtils();