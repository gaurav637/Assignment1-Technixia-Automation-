import mongoose from "mongoose";
import "dotenv/config";

export const connectDatabase = () => {
    try{
        const url = process.env.MONGO_URI;
        mongoose.connect(url);
        console.log("MongoDB server connected Successfully");

    }catch(error){
        console.log("failed to connect mongoDB server");
    }
}

