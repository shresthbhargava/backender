import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";

app.use(cors({
    origin:process.env.CORS_ORIGIN,
    credentials:true,
    methods:["GET","POST","PUT","DELETE"],
}));

app.use(express.json({limit:"10mb"}));
app.use(express.urlencoded({extended:true,limit:"10mb"}))   
app.use(express.static("public"));
app.use(cookieParser());
import userRouter from "./routes/user.routes.js"
const app=express();
app.use("/api/v1/users",userRouter);
export {app};