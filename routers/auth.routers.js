const {Router, request, response} = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("config");
const {check, validationResult} = require("express-validator");
const User = require('./../models/User');
const router = Router();

//Middlewares
const checkEmail = ()=>check('email', 'The email is wrong').isEmail();
const checkEmailLogin = ()=>check('email', 'Enter a correct email').normalizeEmail().isEmail();
const checkPass = ()=>check('password', 'The password length should be').isLength({
    min: 6
});
const checkPassLogin = ()=>check('password', 'Enter a password').exists();

//'api/auth/register'
router.post('/register', [checkEmail(),checkPass()], async (request, response)=>{
    try {
        console.log("Body", request.body);
        //Validate parameters
        const errors = validationResult(request);
        if(!errors.isEmpty()){
            return response.status(400).json( {
                message: "The registration data is incorrect. '400 bad Request'",
                errors: errors.array()
            } );
        }
        //Get email and password
        const {email, password} = request.body;
        //Check if email exists in DB
        const candidate = await User.findOne({email :email});
        //If User exists
        if(candidate){
            return response.status(400).json( {message: "This user already exists. '400 bad Request'"} );
        }
        //Hashing pasword
        const hashedPassword = await bcrypt.hash(password, 12);
        const user = new User({
            email: email,
            password: hashedPassword       
        });
        //Save User into DB, 'await' for Promise
        await user.save();
        //
        response.status(201).json( {message: "User has been added to Db.'201 Created'"} );
    }catch(e){
       response.status(500).json({message: "Something went wrong try again!"}) 
    }
});
//'api/auth/login'
router.post('/login',[checkEmailLogin(),checkPassLogin()], async (request, response)=>{
    try {
        //Validate parameters
        const errors = validationResult(request);
        if(!errors.isEmpty()){
            return response.status(400).json( {
                message: "The registration data is incorrect. '400 bad Request'",
                errors: errors.array()
            } );
        }
        const {email, password} = request.body;
        // Try to find User by email
        const user = await User.findOne({email:email});
        if (!user){
            return response.status(400).json( {
                message: "User is not found. '400 bad Request'"
            } );
        }
        //if email has been found compare the password
        const isMatch = await bcrypt.compare(password, user.password);
        if(isMatch){
            return response.status(400).json( {
                message: "Passwords aren`t matched. '400 bad Request'"
            } );
        }
        //Use token
        const token = jwt.sign(
            {userId: user.id},
            config.get("jwtSecret"),
            {expiresIn: '1h'}
        );
        //By default status is - 200, we may skip it
        respons.status(200).json({
            token: token,
            userId: user.id
        });
    }catch(e){
       response.status(500).json({message: "Something went wrong try again!"}); 
    }
});


module.exports =router;