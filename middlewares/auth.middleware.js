const jwt = require("jsonwebtoken");
const config = require("./../config/default.json");

//Middleware
module.exports = (request, response, next)=>{
    if(request.method == "OPTIONS"){
        //Go further
        return next();
    }
    try{
        const token = request.headers.authorization.split(" ")[1];//"Bearer TOKEN"
        if(!token){
            //401 Unauthorized, return - is to stop execution
            return response.status(401).json({message: "You aren't authorized"});
        }
        const decode = jwt.verify(token, config.get("jwtSecret"));
        //Create property user on object request and write decode token into it.
        request.user - decode;
        //Go further
        next();
    }catch(e){
        //if 'decode' is bad
        response.status(401).json({message: "You aren't authorized"});
    }
};