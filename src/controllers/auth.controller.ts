import { NextFunction, Request, Response } from "express";
import User from "../models/user.model";
import { comparePassword, hashPassword } from "../utils/bcrypt.util";
import AppError from "../utils/customError.util";
import { catchAsync } from "../utils/catchAsync.util";
import { deleteFromCloudinary, upload } from "../utils/cloudinary.util";
import { genrateToken } from "../utils/jwt.util";
import ENV_CONFIG from "../config/env.config";

export const register=async(req:Request,res:Response,next:NextFunction)=>{
    try {
        const {full_name,email,password}=req.body;
        const file=req.file;
        const profile_image=file?.path;

        if(!full_name){
            // const error:any=new Error("full_name is required");
            // error.status='fail';
            // error.statusCode=400;
            // throw error;

            throw new AppError("full_name is required",400);
        }

        if(!email){
            // const error:any=new Error("email is required");
            // error.status='fail';
            // error.statusCode=400;
            // throw error;
            throw new AppError("email is required",400);
        }

        if(!password){
            // const error:any=new Error("password is required");
            // error.status='fail';
            // error.statusCode=400;
            // throw error;

            throw new AppError("password is required",400);
        }

        const user=new User ({full_name,email,profile_image});

        //! hash Password
        const hash=hashPassword(password);
        user.password=await hash;

        //! profile_image
        if(file){
            const {path,public_id}=await upload(file,"/profile_images");
            user.profile_image={
                path,
                public_id,
            }
        }

        await user.save();

        //! success response
        res.status(201).json({
            message:"Account Created",
            data:{
                full_name:user.full_name,
                email:user.email,
                profile_image:user.profile_image,
                role:user.role,
            },
            status:"success",
            success:true,
        });

    } catch (error) {
        next(error);
    }
};


export const login=catchAsync(async(req:Request,res:Response,next:NextFunction)=>{
 
        const {email,password}=req.body;
        if(!email){
            throw new AppError("email is required",400);
        }

        if(!password){
            throw new AppError("password is required",400);
        }

        const user=await User.findOne({email}).select("+password");

        if(!user){
            throw new AppError("Invalid Credentials",400);
        }

        //! isPassword Matched
        const isPasswordMatched=await comparePassword(password,user.password);
         if(!isPasswordMatched){
            throw new AppError("Invalid Credentials",400);
        }

         //! genrate token
        const access_token=genrateToken({
            _id:user._id,
            email:user.email,
            role:user.role,
        });

        //! set cookies
        res.cookie("access_token",access_token,{
            secure:ENV_CONFIG.NODE_ENV==="development"? false:true,
            httpOnly:ENV_CONFIG.NODE_ENV==="development"?false:true,
            maxAge:ENV_CONFIG.COOKIE_EXPIRY *24*60*60*1000,
            sameSite:ENV_CONFIG.NODE_ENV==="development"?"lax":"none",
        });

        //! success response
          res.status(200).json({
            message:"User Logged in Successfully",
            data:{
                full_name:user.full_name,
                email:user.email,
                role:user.role,
            },
            access_token,
            status:"success",
            success:true,
        }); 
})



//* change profile image

export const changeProfile=catchAsync(async(req,res)=>{
    const file=req.file;
    const userId=req.user?.id;
    if(!file){
        throw new AppError("image is required",400);
    }
    const user=await User.findOne({_id:userId});
     if(!user){
        throw new AppError("user not found",404);
    }
    if(user.profile_image){
        deleteFromCloudinary(user.profile_image.public_id);
    }
    
    const {path,public_id}=await upload(file,"/profile_image");
    user.profile_image={
        path,
        public_id,
    };

    await user.save();
    res.status(201).json({
        message:"profile_image updated",
        data:user,
    })

})