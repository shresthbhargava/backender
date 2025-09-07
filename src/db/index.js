import moongoose from "moongoose";
import express from "express";
import { DB_NAME } from "../constants.js";
const connectDB=async()=>{
    try{
        const connectioninstance = await moongoose.connect(`${process.env.MONGODB_URL}/${DB_NAME}`)

        console.log('mongodb connected successfully $ {connectioninstance.connection.host}');
    }catch(err){
        console.log("error while connecting to db",err)
        process.exit(1)
    }
}
export default connectDB;