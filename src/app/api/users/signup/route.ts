import { connect } from "@/dbConfig/dbConfig";
import User  from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import { error } from "console";
import { sendEmail } from "@/helpers/mailer";

connect();


export  async function  POST(request:NextRequest){
    try{
        const reqBody=await request.json()
        const {username,email,password}=reqBody

        console.log(reqBody);
       const user= await User.findOne({email})
       if(user){
        return NextResponse.json({error:"user already exist"},{status:400})
       }

       const salt=await bcryptjs.genSalt(10)
       const hashedPassword =await  bcryptjs.hash(password,salt)


      const newUser= new User({
        username,
        email,
        password:hashedPassword
       })

       const saveduser=await newUser.save()
       console.log(saveduser);


       await sendEmail({email,emailType:"VERIFY",userId:saveduser._id})

       return NextResponse.json({
        message:"user created succesfully",
        success:true,
        saveduser
        })
    }
    catch(error:any){
        return NextResponse.json({error:error.message},
            {status:500}
        )
    }
}



