import mongoose from 'mongoose';

//! user schema

//full_name, email,password

const userSchema=new mongoose.Schema({

    full_name:{
        type:String,
        required:[true,"full_name is required"],
        trim:true,
        minLength:[3,"name must be atleast 3 chracter long"],
    },

    email:{
        type:String,
        required:[true,"email is required"],
        trim:true,
        unique:true,
    },

    role:{
        type:String,
        enum:["USER","ADMIN"],
        default:"USER",
    },

    password:{
        type:String,
        required:[true,"password is required"],
        select:false,
        
    },

    profile_image:{
        type:String,
        
    }

},{timestamps:true});


//! user model

const User=mongoose.model("user",userSchema);
export default User;