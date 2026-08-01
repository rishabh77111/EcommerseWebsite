import { NextFunction, Request, Response } from "express"
import Category from "../models/category.models";
import AppError from "../utils/customError.util";
import { deleteFromCloudinary, upload } from "../utils/cloudinary.util";

export const getAll=async(req:Request,res:Response,next:NextFunction)=>{
    try {

        const filter:Record<string,any>={};
        const {query}=req.query;
        if(query){
            // filter.name={
            //     $regex:query,
            //     $options:"i",
            // };

            filter.$or=[
                {
                    name:{
                      $regex:query,
                      $options:"i",  
                    }
                },
                {
                    description:{
                        $regex:query,
                        $options:"i", 
                    }
                }
            ]
               
            
        }
        const category=await Category.find(filter);
        if(category.length===0){
            throw new AppError("No category available",400);
        }

         res.status(200).json({
             message:"category fetch successfully",
            data:category,
            status:"succes",
         });
    } catch (error) {
          next(error);
    }

}

export const getById=async(req:Request,res:Response,next:NextFunction)=>{
    try {
        const {id}=req.params;
        const category=await Category.findOne({_id:id});
        if(!category){
            throw new AppError(`category at id: ${id} not found`,404);
        }

        res.status(200).json({
            message:"catgeory fetched successfully",
            data:category,
            status:"success",
        });
    } catch (error) {
        next(error);
    }
}

export const create=async(req:Request,res:Response,next:NextFunction)=>{
    try {
        const {name,description}=req.body;
    const file=req.file;
    if(!name){
        throw new AppError("name is required",400);
    }

    if(!description){
        throw new AppError("description is required",400);
    }

    if(!file){
        throw new AppError("image is required",400);
    }

    const category=new Category({name,description});

    if(file){
        const {path,public_id}=await upload(file,"/categories");
        category.image={
            path,
            public_id,
        }
    }
    await category.save();
    res.status(201).json({
        message:"category created successfully",
        data:category,
        status:"success",
    });
    } catch (error) {
        next(error);
    }
}

export const update=async(req:Request,res:Response,next:NextFunction)=>{
    try {
        const {id}=req.params;
    const {name,description}=req.body;
    const file=req.file;

    const category=await Category.findOne({_id:id});
    if(!category){
        throw new AppError(`category at id: ${id} not found`,404);
    }

    if(name){
        category.name=name;
    }

    if(description){
        category.description=description;
    }

    if(file){
        await deleteFromCloudinary(category.image!.public_id);

        //upload
        const {path,public_id}=await upload(file,"/categories")
        category.image={
            path,
            public_id,
        }
    }
    await category.save();
    res.status(200).json({
         message:"category updated successfully",
        data:category,
        status:"success",
    });
    } catch (error) {
        next(error);
    }
}

export const remove=async(req:Request,res:Response,next:NextFunction)=>{
   try {
         const {id}=req.params;
    const category=await Category.findOne({_id:id});
    if(!category){
        throw new AppError(`Category not found at id : ${id}`,404);
    }

    await deleteFromCloudinary(category.image!.public_id);

    await category.deleteOne();

    res.status(200).json({
        message:"category deleted successfully",
        data:null,
        status:"success",
    });
   } catch (error) {
        next(error);
   }
}