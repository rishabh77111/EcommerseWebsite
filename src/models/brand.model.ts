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
        path:{
            type:String,
            required:true,
        },
        public_id:{
            type:String,
            required:true,
        }

    }

},{timestamps:true,toJSON:{transform: (doc, ret:any)=> {
      delete ret._id;
      delete ret.__v;
      // keep ret.id if you still want a clean id field, or delete that too
    }}});

const Brand=mongoose.model("brand",brandSchema);
export default Brand;