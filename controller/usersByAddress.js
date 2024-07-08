import User from "../models/user.js";

export const getUsersByAddress = async (req,res) => {
    try{
        const givenAddress = req.query.address;
        if(!givenAddress){
            console.log("address not provide!");
            res.status(400).json({Message: "Bad requeest because address not provided!"});
        }
        const regex = new RegExp(givenAddress, 'i');
        console.log("regex -> ",regex);
        const users = await User.find({ address: regex });
        res.status(200).json(users);
    }catch(error){
        console.log("failed to get users by address");
        res.status(500).json({Message: "failed to get users by address"});
    }
}