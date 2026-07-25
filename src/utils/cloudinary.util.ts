import cloudinary from "../config/cloudinary.config";
import fs from "fs";
export const upload=async(file:Express.Multer.File,dir="/")=>{
    try {

        //! folder creation and upload to cloudinary
        const folder="EcommerseWebsite-BI" + dir;
        const {secure_url:path,public_id}=await cloudinary.uploader.upload(file.path,
            {
                resource_type:"auto",
                unique_filename:true,
                folder,
                transformation:{
                    width: 900,
                    height: 900,
                    crop: "fill",
                    fetch_format: "auto",
                    gravity: "face",
                    format: "auto",
                }
            }
        )

        //! delete from local file
        if(fs.existsSync(file.path)){
            fs.unlinkSync(file.path);
        }

        //! return
        return {
            path,
            public_id,
        }

    } catch (error) {
        // console.log(error);
        // throw new Error("something went wrong");
        console.error(error)
        throw new Error(error instanceof Error ? error.message : "Cloudinary upload failed");
        
    }
}


export const deleteFromCloudinary=async(public_id:string)=>{
    try {
        const result = await cloudinary.uploader.destroy(public_id);
        return result;
    } catch (error) {
        console.log(error);
        throw new Error("something went wrong");
        
    }
}