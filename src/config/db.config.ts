import mongoose from "mongoose";
import ENV_CONFIG from "./env.config";


export const connectDB=async(DB_URI:string)=>{
    try {
        await mongoose.connect(DB_URI);
        console.log("Database connected");
    } catch (error) {
        console.log(error);
        console.log("Database not connected");
    }
};