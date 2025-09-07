import moongoose from "moongoose";
import {DB_NAME} from "./constants.js"
import express from "express";
    
import connectDB from "./db/index.js";
import dotenv from "dotenv";
dotenv.config({
    path:"./env"
});

connectDB()
.then(()=>{
    app.listen(process.env.PORT,()=>{
        console.log(`server started at port ${process.env.PORT}`);
    });
})
.catch((err)=>{
    console.log("error in connecting to db",err);
    process.exit(1);
});
