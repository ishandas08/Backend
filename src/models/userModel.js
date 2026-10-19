import mongoose from "mongoose";
import { unique } from "next/dist/build/utils";
import { ST } from "next/dist/shared/lib/utils";
import { type } from "os";
const userSchema=new mongoose.Schema({
    username:{
        type:String,
        required:[true,"please provide a username"],
        unique:true,
    },
    email:{
        type:String,
        required:[true,"email is required"],
        unique:true,
    },
    password:{
        type:String,
        required:[true,"password is required"],
    },
    isvarified:{
        type:Boolean,
        default:false,
    },
    isAdmin:{
        type:Boolean,
        default:false,
    },
    forgotPasswordToken:String,
    forgotPasswordTokenExpiry:Date,
    verifyToken:String,
    verifyTokenExpiry:Date,
    
})
const User=mongoose.models.users ||mongoose.model("users",userSchema);
export default User;