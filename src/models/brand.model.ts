import mongoose from 'mongoose';

const brandSchema=new mongoose.Schema({
    name:{
        type:String,
        unique:[true,"brand already exists with provided name"],
        trim:true,
    },

    description:{
        type:String,
        minLength:25,
        trim:true,
    },

    logo:{
        type:String,
    }

},{timestamps:true});

const Brand=mongoose.model("brand",brandSchema);
export default Brand;