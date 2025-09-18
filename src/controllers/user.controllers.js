import {asyncHandler} from "../utils/asyncHandler.js"
import {ApiError} from "../utils/ApiError.js"
import {User} from "../models/user.module.js"   
import {uploadToCloudinary} from "../utils/cloudinary.js"
import {ApiResponse} from "../utils/ApiResponse.js"
const registerUser = asyncHandler(async (req, res) => {
    const {name, email, password} = req.body;
    // Add your user registration logic here
    console.log( "email:",email);
     if ([name, email, password].some((field) => field === undefined || field?.trim() === "")) {
         throw new ApiError("All fields are required", 400);
     }
     const existedUser = await User.findOne({
        $or: [{email}]
     })
        if(existedUser){throw new ApiError("User already exists",409)}
        const avatarLocalPath = req.files?.avatar[0]?.path;
        const coverImageLocalPath = req.files?.coverImage[0]?.path;
        if(!avatarLocalPath ){
            throw new ApiError("Avatar is required",400);
        }
        const avatarUrl=await uploadToCloudinary(avatarLocalPath)        
        const coverImageUrl=await uploadToCloudinary(coverImageLocalPath)
        if(!avatarUrl){
            throw new ApiError("Avatar is required",400);
        }        
        const user = await User.create({
            username: name.toLowerCase(),
            avatar: avatarUrl,
            coverImage: coverImageUrl || "",
            password,
            email,
            fullname: name,
        })
        const createdUser=await User.findById(user._id).select("-password -refreshToken")
        if(!createdUser){
            throw new ApiError("User not created",500);
        }
        return res.status(201).json(new ApiResponse(201, "User registered successfully", createdUser))
})

export { registerUser };