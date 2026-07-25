import { NextFunction, Request, Response } from "express";
import User from "../models/user.model";
import { comparePassword, hashPassword } from "../utils/bcrypt.util";
import AppError from "../utils/customError.util";
import { catchAsync } from "../utils/catchAsync.util";

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

        //! success response
          res.status(200).json({
            message:"User Logged in Successfully",
            data:{
                full_name:user.full_name,
                email:user.email,
                role:user.role,
            },
            status:"success",
            success:true,
        }); 
})
