import mongoose from "mongoose";
export async function connect(){
    try{
        mongoose.connect(process.env.MONGO_URI!);
        const connection=mongoose.connection;

        connection.on('connected',()=>{
            console.log("mongodb connected");
        })
        connection.on('error',(err)=>{
            console.log("mongodb connection error"+err);
            process.exit();
        })

    }catch(error){
        console.log("somehting went wrong in the database connection");
        console.log(error);
    }
}