import { NextFunction, Request, Response } from "express";
import { Role } from "../@types/enum.type";
import AppError from "../utils/customError.util";

export const authenticate=(roles?:Role[])=>{
    return (req:Request,res:Response,next:NextFunction)=>{
      try {  
       // console.log(req.cookies);

       //!get access token
       const cookies=req.cookies;
       const access_token=cookies["access_token"];
       if(!access_token){
        throw new AppError("Unauthroized.Access denied",401);
       }


       //! verify token

       //!check role

       
        next();
        }
      catch (error) {
        next(error);
        }
    }
}