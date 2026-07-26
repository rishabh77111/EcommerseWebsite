import mongoose from "mongoose"

const categorySchema=new mongoose.Schema({

    name:{
        type:String,
        required: [true, "name is required"],
        trim: true,
    },

    description:{
        type: String,
        minLength: 25,
        trim: true,
    },

    image:{
        path:{
            type:String,
            required:true,
        },
        public_id:{
            type:String,
            required:true,
        },
         required: [true, "image is required"],
    }
},{timestamps:true});

const Category=mongoose.model("category",categorySchema);
export default Category;