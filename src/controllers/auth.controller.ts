import { NextFunction, Request, Response } from "express";
import User from "../models/user.model";
import { hashPassword } from "../utils/bcrypt.util";

export const register=async(req:Request,res:Response,next:NextFunction)=>{
    try {
        const {full_name,email,password}=req.body;

        if(!full_name){
            const error:any=new Error("full_name is required");
            error.status='fail';
            error.statusCode=400;
            throw error;
        }

        if(!email){
            const error:any=new Error("email is required");
            error.status='fail';
            error.statusCode=400;
            throw error;
        }

        if(!password){
            const error:any=new Error("password is required");
            error.status='fail';
            error.statusCode=400;
            throw error;
        }

        const user=new User ({full_name,email});

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
                role:user.role,
            },
            status:"success",
            success:true,
        });

    } catch (error) {
        next(error);
    }
};

