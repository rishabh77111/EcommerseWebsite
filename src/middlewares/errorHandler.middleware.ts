import { NextFunction, Request, Response } from "express";
import { JsonWebTokenError, TokenExpiredError } from "jsonwebtoken";

export const errorHandler=(error:any,req:Request,res:Response,next:NextFunction)=>{
    console.log(error);
    let message=error?.message ?? "something went wrong";
    const status=error?.status ?? "error";
    let statusCode=error?.statusCode ?? 500;

    if(error instanceof JsonWebTokenError){
        message:'Invalid token. Access denied';
        statusCode:401;
    }

     if(error instanceof TokenExpiredError){
        message:'Token Expired. Access denied';
        statusCode:401;
    }
    res.status(statusCode).json({
        message,
        status,
        data:null,
        stack:error?.stack,
    });
};