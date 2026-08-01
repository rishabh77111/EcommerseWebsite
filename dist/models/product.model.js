"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const image_model_1 = require("./image.model");
const productSchema = new mongoose_1.default.Schema({
    name: {
        type: String,
        required: [true, "name is required"],
        trim: true,
        minLength: [3, "name must be at least 3 character long"],
    },
    description: {
        type: String,
        required: [true, "description is required"],
        trim: true,
        minLength: [50, "name must be atleast 50 chracters long"],
        maxLength: [2000, "name must not exceed 2000 characters"],
    },
    price: {
        type: Number,
        required: [true, "price is required"],
        min: 0,
    },
    stock: {
        type: Number,
        required: [true, "stock is required"],
        min: 1,
    },
    cover_image: {
        type: image_model_1.ImageSchema,
        required: [true, "cover image is required"],
    },
    //brand:id  --> 
    brand: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: "brand", //collection
        required: [true, "brand is required"],
    },
    category: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: "category", //collection
        required: [true, "category is required"],
    },
    // images:{
    //     type:ImageSchema,
    // }
    images: [image_model_1.ImageSchema],
    is_featured: {
        type: Boolean,
        default: false,
    },
    new_arrival: {
        type: Boolean,
        default: true,
    }
}, { timestamps: true });
const Product = mongoose_1.default.model("product", productSchema);
exports.default = Product;
