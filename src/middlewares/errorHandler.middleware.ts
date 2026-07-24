import { NextFunction, Request, Response } from "express";

export const errorHandler=(error:any,req:Request,res:Response,next:NextFunction)=>{
    console.log(error);
    let message=error?.message ?? "something went wrong";
    const status=error?.status ?? "error";
    let statusCode=error?.statusCode ?? 500;

    res.status(statusCode).json({
        message,
        status,
        data:null,
        stack:error?.stack,
    });
};