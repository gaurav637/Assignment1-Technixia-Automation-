import User from "../models/user.js";

export const allUserData = async (req,res)=> {
    try{
        const users = await User.find();
        if(!users){
            console.log("Empty - to fetch all user!");
            res.status(204).json({Message: "failed to fetch the all user!" , Error: error.message})
        }
        console.log("all user fetch successfully");
        res.json(users);

    }catch(error){
        console.log("failed to fetch all user!");
        res.status(500).json({Message: "failed to fetch the all user!" , Error: error.message});
    }
}