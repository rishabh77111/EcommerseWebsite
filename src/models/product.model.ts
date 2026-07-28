import mongoose from 'mongoose';

import { ImageSchema } from './image.model';


const productSchema=new mongoose.Schema({

    name:{
        type:String,
        required:[true,"name is required"],
        trim:true,
        minLength:[3,"name must be at least 3 character long"],
    },

    description:{
        type:String,
        required:[true,"description is required"],
        trim:true,
        minLength:[50,"name must be atleast 50 chracters long"],
        maxLength:[2000,"name must not exceed 2000 characters"],
    },

    price:{
        type:Number,
        required:[true,"price is required"],
        min:0,
    },

     stock:{
        type:Number,
        required:[true,"stock is required"],
        min:1,
    },

    cover_image:{
        type:ImageSchema,
        required:[true,"cover image is required"],
    },


    //brand:id  --> 
    brand:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"brand", //collection
        required:[true,"brand is required"],
    },

     category:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"category", //collection
        required:[true,"category is required"],
    },

    // images:{
    //     type:ImageSchema,
       
    // }

    images:[ImageSchema],

    is_featured:{
        type:Boolean,
        default:false,
    },

    new_arrival:{
          type:Boolean,
          default:true,
    }

},{timestamps:true})

const Product= mongoose.model("product",productSchema);
export default Product;