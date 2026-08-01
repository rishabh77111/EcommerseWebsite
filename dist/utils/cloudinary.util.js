"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteFromCloudinary = exports.upload = void 0;
const cloudinary_config_1 = __importDefault(require("../config/cloudinary.config"));
const fs_1 = __importDefault(require("fs"));
const upload = async (file, dir = "/") => {
    try {
        //! folder creation and upload to cloudinary
        const folder = "EcommerseWebsite-BI" + dir;
        const { secure_url: path, public_id } = await cloudinary_config_1.default.uploader.upload(file.path, {
            resource_type: "auto",
            unique_filename: true,
            folder,
            transformation: {
                width: 900,
                height: 900,
                crop: "fill",
                fetch_format: "auto",
                gravity: "face",
                format: "auto",
            }
        });
        //! delete from local file
        if (fs_1.default.existsSync(file.path)) {
            fs_1.default.unlinkSync(file.path);
        }
        //! return
        return {
            path,
            public_id,
        };
    }
    catch (error) {
        // console.log(error);
        // throw new Error("something went wrong");
        console.error(error);
        throw new Error(error instanceof Error ? error.message : "Cloudinary upload failed");
    }
};
exports.upload = upload;
const deleteFromCloudinary = async (public_id) => {
    try {
        const result = await cloudinary_config_1.default.uploader.destroy(public_id);
        return result;
    }
    catch (error) {
        console.log(error);
        throw new Error("something went wrong");
    }
};
exports.deleteFromCloudinary = deleteFromCloudinary;
