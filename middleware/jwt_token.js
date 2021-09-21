const jwt = require('jsonwebtoken');
const { requestParser } = require('../lib/request');
const config = process.env;

const verify = (req,res,next) => {
    const token = 
        req.body.token || req.query.token || req.headers['x-access-token']
    
    if(!token){
        // TOKEN IS REQUIRED SEND 403 INVALID REQUEST AND NOT ALLOWED
        // Error code 200 means that we received a invalid key to our system
        res.locals.result = {
            status: "invalid",
            responseStatus: 403,
            error_code: 200,
            data: {
              status: false
            },
            message:
              "No token is being sent from the following user on the tenant website: " +
              req.body.email,
        };
        requestParser(req,res,next)
    }
    try{
        //USER HAS BEEN VALIDATED NOW ADD IT TO THE REQ OBJECT --> USE NEXT ONCE VALDATED 
        const decoded = jwt.verify(token, config.TOKEN_KEY);
        res.user = decoded
        next()
    }
    catch(error){
        //Return  401 --> THE PROVIDED KEY IS INVALID
        res.locals.result = {
            status: "invalid",
            responseStatus: 401,
            error_code: 100,
            data: {
              status: false
            },
            message:
              "Invald token being sent from the following user on the tenant website: " +
              req.body.email,
        };
        requestParser(req,res,next)

    }
}
module.exports ={
    verify
}