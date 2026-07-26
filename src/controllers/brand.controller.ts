import { NextFunction, Request, Response } from "express"
import Brand from "../models/brand.model";
import AppError from "../utils/customError.util";
import { deleteFromCloudinary, upload } from "../utils/cloudinary.util";

export const getAll=async(req:Request,res:Response,next:NextFunction)=>{
    try {
        const brand=await Brand.find();
        res.status(200).json({
            message:"Brands fetched successfully",
            data:brand,
            success:true,
        })
    } catch (error) {
        next(error);
    }
}

export const getBrandById=async(req:Request,res:Response,next:NextFunction)=>{
 try {
       const{id}=req.params;
    const brand=await Brand.findOne({_id:id});
    if(!brand){
        throw new AppError(`Brand not found at id: ${id}`,400);
    }

    res.status(200).json({
        message:`brand found at id: ${id}`,
        data:brand,
        success:true,
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

    if(!file){
        throw new AppError("logo is required",400);
    }

    const brand=new Brand({name,description,});
    
    if(file){
        const{path,public_id}=await upload(file,"/brands");
        brand.logo={
        path:path,
        public_id:public_id,
    }

    }
    await brand.save();

    res.status(201).json({
        message:"brand created successfully",
        data:brand,
        success:true,
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
    const brand=await Brand.findOne({_id:id});

    if(!brand){
        throw new AppError(`brand: ${id} not found`,404);
    }

    if(name){
        brand.name=name;
    }

    if(description){
        brand.description=description;
    }
    
    if(file){
        await deleteFromCloudinary(brand.logo!.public_id);

        //upload
        const {path,public_id}=await upload(file,"/brands")
        brand.logo={
            path,
            public_id,
        }
    }

    await brand.save();
    res.status(200).json({
        message:"brand updated successfully",
        data:brand,
        status:"success",
    });
    } catch (error) {
        next(error);
    }
}

export const deleteBrand=async(req:Request,res:Response,next:NextFunction)=>{
 try {
    const {id}=req.params;
    const brand=await Brand.findOne({_id:id});
    if(!brand){
        throw new AppError(`brand id: ${id} not found`,400);
    }
    await deleteFromCloudinary(brand.logo!.public_id);

    await brand.deleteOne();

    res.status(200).json({
        message:"brand deleted successfully",
        data:null,
        status:"success",
    });
 } catch (error) {
    next(error);
 }
}