import { connect } from "@/dbConfig/dbConfig";
import User  from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import { error } from "console";
import { use } from "react";
import jwt from "jsonwebtoken"


connect()

export async function POST(request:NextRequest){
    try{

        const reqBody= await request.json();

        const {email,password}=reqBody;
        console.log(reqBody);
        const user =await User.findOne({email});
        if(!user){
            return NextResponse.json({error:"user does not exist"},{status:400})
        }
        const validPassword=await bcryptjs.compare(password,user.password)

        if(!validPassword){
            return NextResponse.json({error:"invalid password "},{status:400})
        }

        const tokenData ={
            id:user._id,
            username:user.username,
            email:user.email
        }
        const token =await jwt.sign(tokenData,process.env.TOKEN_SECRET!,{expiresIn:"1d"})

    }catch(error:any){
        return  NextResponse.json({error:error.message},
            {status:500} 
        )
    }
}