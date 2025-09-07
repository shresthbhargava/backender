import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
const app=express();
app.use(cors({
    origin:process.env.CORS_ORIGIN,
    credentials:true,
    methods:["GET","POST","PUT","DELETE"],
}));
app.use(cookieParser());
app.use(express.json({limit:"10mb"}));
app.use(express.urlencoded({extended:true,limit:"10mb"}))   
app.use(express.static("public"));

export {app};