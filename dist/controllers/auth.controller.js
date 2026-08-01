"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.changePassword = exports.getProfile = exports.changeProfile = exports.login = exports.register = void 0;
const user_model_1 = __importDefault(require("../models/user.model"));
const bcrypt_util_1 = require("../utils/bcrypt.util");
const customError_util_1 = __importDefault(require("../utils/customError.util"));
const catchAsync_util_1 = require("../utils/catchAsync.util");
const cloudinary_util_1 = require("../utils/cloudinary.util");
const jwt_util_1 = require("../utils/jwt.util");
const env_config_1 = __importDefault(require("../config/env.config"));
const sendEmail_util_1 = require("../utils/sendEmail.util");
const emailTemplate_util_1 = require("../utils/emailTemplate.util");
const register = async (req, res, next) => {
    try {
        const { full_name, email, password } = req.body;
        const file = req.file;
        const profile_image = file?.path;
        if (!full_name) {
            // const error:any=new Error("full_name is required");
            // error.status='fail';
            // error.statusCode=400;
            // throw error;
            throw new customError_util_1.default("full_name is required", 400);
        }
        if (!email) {
            // const error:any=new Error("email is required");
            // error.status='fail';
            // error.statusCode=400;
            // throw error;
            throw new customError_util_1.default("email is required", 400);
        }
        if (!password) {
            // const error:any=new Error("password is required");
            // error.status='fail';
            // error.statusCode=400;
            // throw error;
            throw new customError_util_1.default("password is required", 400);
        }
        const user = new user_model_1.default({ full_name, email, profile_image });
        //! hash Password
        const hash = (0, bcrypt_util_1.hashPassword)(password);
        user.password = await hash;
        //! profile_image
        if (file) {
            const { path, public_id } = await (0, cloudinary_util_1.upload)(file, "/profile_images");
            user.profile_image = {
                path,
                public_id,
            };
        }
        await user.save();
        console.log("Register started");
        await (0, sendEmail_util_1.sendEmail)({
            to: user.email,
            subject: "Account Created Successfully",
            html: (0, emailTemplate_util_1.accountCreatedHtml)({
                email: user.email,
                fullName: user.full_name,
                createdAt: new Date(),
            }),
        });
        console.log("Register email function finished");
        //! success response
        res.status(201).json({
            message: "Account Created",
            data: {
                full_name: user.full_name,
                email: user.email,
                profile_image: user.profile_image,
                role: user.role,
            },
            status: "success",
            success: true,
        });
    }
    catch (error) {
        next(error);
    }
};
exports.register = register;
exports.login = (0, catchAsync_util_1.catchAsync)(async (req, res, next) => {
    const { email, password } = req.body;
    if (!email) {
        throw new customError_util_1.default("email is required", 400);
    }
    if (!password) {
        throw new customError_util_1.default("password is required", 400);
    }
    const user = await user_model_1.default.findOne({ email }).select("+password");
    if (!user) {
        throw new customError_util_1.default("Invalid Credentials", 400);
    }
    //! isPassword Matched
    const isPasswordMatched = await (0, bcrypt_util_1.comparePassword)(password, user.password);
    if (!isPasswordMatched) {
        throw new customError_util_1.default("Invalid Credentials", 400);
    }
    //! genrate token
    const access_token = (0, jwt_util_1.genrateToken)({
        _id: user._id,
        email: user.email,
        role: user.role,
    });
    //! send email
    await (0, sendEmail_util_1.sendEmail)({ to: user.email, subject: "Account logged in", html: (0, emailTemplate_util_1.newLoginDetectedHtml)({ email: user.email, fullName: user.full_name, loginAt: new Date(Date.now()), userAgent: req.headers["user-agent"] }),
    });
    //! set cookies
    res.cookie("access_token", access_token, {
        secure: env_config_1.default.NODE_ENV === "development" ? false : true,
        httpOnly: env_config_1.default.NODE_ENV === "development" ? false : true,
        maxAge: env_config_1.default.COOKIE_EXPIRY * 24 * 60 * 60 * 1000,
        sameSite: env_config_1.default.NODE_ENV === "development" ? "lax" : "none",
    });
    //! success response
    res.status(200).json({
        message: "User Logged in Successfully",
        data: {
            full_name: user.full_name,
            email: user.email,
            role: user.role,
        },
        access_token,
        status: "success",
        success: true,
    });
});
//* change profile image
exports.changeProfile = (0, catchAsync_util_1.catchAsync)(async (req, res) => {
    const file = req.file;
    const userId = req.user?.id;
    if (!file) {
        throw new customError_util_1.default("image is required", 400);
    }
    const user = await user_model_1.default.findOne({ _id: userId });
    if (!user) {
        throw new customError_util_1.default("user not found", 404);
    }
    if (user.profile_image) {
        (0, cloudinary_util_1.deleteFromCloudinary)(user.profile_image.public_id);
    }
    const { path, public_id } = await (0, cloudinary_util_1.upload)(file, "/profile_image");
    user.profile_image = {
        path,
        public_id,
    };
    await user.save();
    res.status(201).json({
        message: "profile_image updated",
        data: user,
    });
});
//* get profile
exports.getProfile = (0, catchAsync_util_1.catchAsync)(async (req, res) => {
    const id = req.user._id;
    const user = await user_model_1.default.findOne({ _id: id });
    if (!user)
        throw new customError_util_1.default("profile not found", 400);
    res.status(200).json({
        message: "profile fetched",
        data: user,
    });
});
//* change password
exports.changePassword = (0, catchAsync_util_1.catchAsync)(async (req, res) => {
    const id = req.user._id;
    const { new_password, password } = req.body;
    if (!new_password)
        throw new customError_util_1.default("new password is required", 400);
    if (!password)
        throw new customError_util_1.default("old password is required", 400);
    const user = await user_model_1.default.findOne({ _id: id }).select("+password");
    if (!user)
        throw new customError_util_1.default("user not found", 404);
    const isOldPassMatched = await (0, bcrypt_util_1.comparePassword)(password, user.password);
    if (!isOldPassMatched)
        throw new customError_util_1.default("passwords does not matched", 400);
    const hash = await (0, bcrypt_util_1.hashPassword)(new_password);
    user.password = hash;
    await user.save();
    res.status(200).json({
        message: "password changed",
        data: null,
    });
});
