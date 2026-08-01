"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const enum_type_1 = require("../@types/enum.type");
const image_model_1 = require("./image.model");
//! user schema
//full_name, email,password
const userSchema = new mongoose_1.default.Schema({
    full_name: {
        type: String,
        required: [true, "full_name is required"],
        trim: true,
        minLength: [3, "name must be atleast 3 chracter long"],
    },
    email: {
        type: String,
        required: [true, "email is required"],
        trim: true,
        unique: true,
    },
    role: {
        type: String,
        enum: Object.values(enum_type_1.Role),
        default: enum_type_1.Role.USER,
    },
    password: {
        type: String,
        required: [true, "password is required"],
        select: false,
    },
    profile_image: {
        type: image_model_1.ImageSchema,
        default: null,
    }
}, { timestamps: true });
//! user model
const User = mongoose_1.default.model("user", userSchema);
exports.default = User;
