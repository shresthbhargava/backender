import mongoose,{Schema} from "mongoose";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { use } from "react";
const userSchema=new Schema({
  username:{type:String,required:true,index:true,unique:true,trim:true},
    email:{type:String,required:true,unique:true,trim:true},
    fullname:{type:String,required:true,trim:true},
    avatar:{type:String,required:true},
    coverImage:{type:String},
    watchHistory:{type:Schema.Types.ObjectId,ref:"Video"},
    password:{type:String,required:true,trim:true},
    refreshToken:{type:String},

},{timestamps:true})
userSchema.pre("save",async function(next){
    if(!this.isModified("password")){
        return next();
    }
    this.password=await bcrypt.hash(this.password,10);
    next();
})
userSchema.methods.comparePassword=async function(password){
    return await bcrypt.compare(password,this.password)
}
userSchema.methods.generateAccessToken=function(){
    return jwt.sign({userId:this._id},process.env.ACCESS_TOKEN_SECRET,{
        expiresIn:process.env.ACCESS_TOKEN_EXPIRES_IN,
    });
}
userSchema.methods.generateRefreshToken=function(){
    return jwt.sign({userId:this._id},process.env.REFRESH_TOKEN_SECRET,{
        expiresIn:process.env.REFRESH_TOKEN_EXPIRES_IN,
    });
}
export const User=mongoose.model("User",userSchema)