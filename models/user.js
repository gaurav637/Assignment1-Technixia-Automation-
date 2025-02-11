import {Schema} from "mongoose";
import {model} from "mongoose";

const userSchema = new Schema({
    name:{
        type: String,
        required: true,
    },
    age:{
        type: Number
    },
    address:{
        type: String,
        required: true
    },
    username:{
        type: String,
        required: true,
        unique: true
    },
    password:{
        type: String,
        required: true
    }
},{timestamps: true})

const User = model('User',userSchema);
export default User;