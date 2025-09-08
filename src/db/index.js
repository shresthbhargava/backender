import mongoose from "mongoose";
import express from "express";
import { DB_NAME } from "../constants.js";
const connectDB=async()=>{
    try{
        const connectionInstance = await mongoose.connect(`${process.env.MONGODB_URL}/${DB_NAME}`)

        console.log(`mongodb connected successfully ${connectionInstance.connection.host}`);
    }catch(err){
        console.log("error while connecting to db",err)
        process.exit(1)
    }
}
export default connectDB;