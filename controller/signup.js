import User from "../models/user.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";


export const RegisterUser = async (req,res)=> {
    try{
        const {name,age,username,password,address,email} = req.body;
        if(!password){
            console.log("password -> ",password);
            res.status(400).json({Message: "this password is 323 is used another account"});
        }
        if(!name || !username || !password || !address){
            console.log("Please full fill all information about user");
            res.status(400).json({Message: "user not provide all information"});
        }
        
        const checkUser = await User.findOne({username});
        if(checkUser){
            console.log("this username already used !");
            res.status(400).json({Message: "this username is used another account"});
        }
        const checkEmail = await User.findOne({email});
        if(checkUser){
            console.log("this email already exist !");
            res.status(400).json({Message: "this email is used another account"});
        }
        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(password,salt);
        const user = new User({
            name,
            username,
            email,
            age,
            password: hashPassword,
            address
        });

        const newUser = await user.save();
        return res.redirect('/');
       // res.status(201).json({Message: "User createsd" , Data: user});

    }catch(error){
        console.log("User Not Register!");
        res.status(500).json({
            Message: "User is Not Register",
            Error: true
        })
    }
}