import User from "../models/user.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

export const loginUser = async (req,res) => {
    const {username , password} = req.body;
    if(!username){
        console.log("username is mandatory!");
        res.status(400).json({Message: "username is not provided!"});
    }
    if(!password){
        console.log("password is mandatory!");
        res.status(400).json({Message: "password is not provided!"});
    }

    const user = await User.findOne({username});
    if(!user){
        console.log("invlid username!");
        res.status(401).json({Message: "Failed to authenticate!"});
    }
    const passwordMatch = await bcrypt.compare(password,user.password);
    if(!passwordMatch){
        console.log("invalid password!");
        res.status(401).json({Message: "Failed to authenticate!"});
    }
    const key = process.env.SECRET_KEY;
    const token = jwt.sign({userId:user._id},key,{ expiresIn: '7d' });
    console.log("user login ");
    return res.cookie("token",token).redirect('/welcome');
}