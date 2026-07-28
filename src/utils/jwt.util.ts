import mongoose from 'mongoose';
import { Role } from '../@types/enum.type';
import jwt from 'jsonwebtoken';
import ENV_CONFIG from '../config/env.config';

export interface IjwtPayload{
    _id:mongoose.Types.ObjectId;
    email:string,
    role:Role,
}


interface IjwtReturn extends IjwtPayload{
    iat:number;
    exp:number;
}
export const genrateToken=(payload:IjwtPayload)=>{
    try {
        return jwt.sign(payload,ENV_CONFIG.JWT_SECRET,{
            expiresIn:ENV_CONFIG.JWT_EXPIRES_IN as any,
        })
    } catch (error) {
        console.log(error);
        throw new Error("Something went wrong");
    }
}

export const verifyToken=(token:string)=>{
    try {
        return jwt.verify(token,ENV_CONFIG.JWT_SECRET) as IjwtReturn;
    } catch (error) {
        console.log(error);
        //throw new Error("something went wrong");
        throw error;
    }
}