import mongoose from 'mongoose';
import { Role } from '../@types/enum.type';
import { ImageSchema } from './image.model';


//? user interface
interface IUser extends Document {
  full_name: string;
  email: string;
  password: string;
  role: Role;
  profile_image?:{
    path: string;
    public_id: string;
  },
}


//! user schema

//full_name, email,password

const userSchema=new mongoose.Schema<IUser>({

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
        enum:Object.values(Role),
        default:Role.USER,
    },

    password:{
        type:String,
        required:[true,"password is required"],
        select:false,
        
    },

    profile_image:{
          type: ImageSchema,
          default: null,
        
    }

},{timestamps:true});


//! user model

const User=mongoose.model<IUser>("user",userSchema);
export default User;