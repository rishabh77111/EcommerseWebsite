import { NextFunction, Request, Response } from "express";
import { Role } from "../@types/enum.type";
import AppError from "../utils/customError.util";
import { verifyToken } from "../utils/jwt.util";

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

       //! verify token-401
       const decoded_data=verifyToken(access_token);
       if(!decoded_data){
        throw new AppError("Invalid to.Access denied",401);
       }

       //!check role-403
       if(roles && !roles.includes(decoded_data.role)){
        throw new AppError("Forbidden. can not access this resource",403);
       }

       req.user={
        _id:decoded_data._id,
        email:decoded_data.email,
        role:decoded_data.role,
        
       }
        next();
        }
      catch (error) {
        next(error);
        }
    }
}