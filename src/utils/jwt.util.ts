import mongoose from 'mongoose';
import { Role } from '../@types/enum.type';
import jwt from 'jsonwebtoken';
import ENV_CONFIG from '../config/env.config';

interface IjwtPayload{
    _id:mongoose.Types.ObjectId;
    email:string,
    role:Role,
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