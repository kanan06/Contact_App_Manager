const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const asyncHandler= require("express-async-handler");
const User = require("../models/userModel");

//@register a user 
//route GET api/users/register
//access public 

const registerUser = asyncHandler(async  (req,res) => {
    const {username,email,password} = req.body;
    if(!username || !email || !password ){
        res.status(400);
        throw new Error("Please fill all the fields");
    }
    const userAvailable = await User.findOne({email});
    if(userAvailable) {
        res.status(400);
        throw new Error("Please fill all the fields");
    }
    //Hashpassword 
    const hashedPassword = await bcrypt.hash(password,10);
    console.log("Hashed Password :", hashedPassword);
    const user = await User.create({
        username,
        email,
        password:hashedPassword,
        });
        
        console.log(`user created ${user}` );
        if(user)
            {
                res.status(201).json({_id:user.id, email:user.email});
                }
                else{
                    res.status(400);
                    throw new Error("Invalid user data");y
            }
    res.json({ message:"Register the user" });

});

//@login a user 
//route POST  api/users/login
//access public 

const loginUser = asyncHandler(async  (req,res) => {
    const {email,password} = req.body;
    if(!email || !password ){
        res.status(400);
        throw new Error("Please fill all the fields");
        }
        const user = await User.findOne({email});
        if(user && (await bcrypt.compare(password,user.password))){
            const accessToken = jwt.sign(
        {
            user: {

                user:user.username,
                email:user.email,
                id:user._id,
            },
            }, 
            process.env.ACCESS_TOKEN_SECRET,
            {expiresIn :"1m"}
        );
            res.status(200).json({accessToken});
        }
        else{
            res.status(401);
            throw new Error("Invalid credentials");
        }
});

//@current user 
//route POST  api/users/current
//access private

const currentUser = asyncHandler(async (req,res) => {
    res.json({ message:"current  user information " });

});
module.exports = {registerUser,loginUser , currentUser };