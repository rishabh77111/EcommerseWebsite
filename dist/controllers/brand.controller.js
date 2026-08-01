"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteBrand = exports.update = exports.create = exports.getBrandById = exports.getAll = void 0;
const brand_model_1 = __importDefault(require("../models/brand.model"));
const customError_util_1 = __importDefault(require("../utils/customError.util"));
const cloudinary_util_1 = require("../utils/cloudinary.util");
const getAll = async (req, res, next) => {
    try {
        const brand = await brand_model_1.default.find();
        res.status(200).json({
            message: "Brands fetched successfully",
            data: brand,
            success: true,
        });
    }
    catch (error) {
        next(error);
    }
};
exports.getAll = getAll;
const getBrandById = async (req, res, next) => {
    try {
        const { id } = req.params;
        const brand = await brand_model_1.default.findOne({ _id: id });
        if (!brand) {
            throw new customError_util_1.default(`Brand not found at id: ${id}`, 400);
        }
        res.status(200).json({
            message: `brand found at id: ${id}`,
            data: brand,
            success: true,
        });
    }
    catch (error) {
        next(error);
    }
};
exports.getBrandById = getBrandById;
const create = async (req, res, next) => {
    try {
        const { name, description } = req.body;
        const file = req.file;
        if (!name) {
            throw new customError_util_1.default("name is required", 400);
        }
        if (!file) {
            throw new customError_util_1.default("logo is required", 400);
        }
        const brand = new brand_model_1.default({ name, description, });
        if (file) {
            const { path, public_id } = await (0, cloudinary_util_1.upload)(file, "/brands");
            brand.logo = {
                path: path,
                public_id: public_id,
            };
        }
        await brand.save();
        res.status(201).json({
            message: "brand created successfully",
            data: brand,
            success: true,
        });
    }
    catch (error) {
        next(error);
    }
};
exports.create = create;
const update = async (req, res, next) => {
    try {
        const { id } = req.params;
        const { name, description } = req.body;
        const file = req.file;
        const brand = await brand_model_1.default.findOne({ _id: id });
        if (!brand) {
            throw new customError_util_1.default(`brand: ${id} not found`, 404);
        }
        if (name) {
            brand.name = name;
        }
        if (description) {
            brand.description = description;
        }
        if (file) {
            await (0, cloudinary_util_1.deleteFromCloudinary)(brand.logo.public_id);
            //upload
            const { path, public_id } = await (0, cloudinary_util_1.upload)(file, "/brands");
            brand.logo = {
                path,
                public_id,
            };
        }
        await brand.save();
        res.status(200).json({
            message: "brand updated successfully",
            data: brand,
            status: "success",
        });
    }
    catch (error) {
        next(error);
    }
};
exports.update = update;
const deleteBrand = async (req, res, next) => {
    try {
        const { id } = req.params;
        const brand = await brand_model_1.default.findOne({ _id: id });
        if (!brand) {
            throw new customError_util_1.default(`brand id: ${id} not found`, 400);
        }
        await (0, cloudinary_util_1.deleteFromCloudinary)(brand.logo.public_id);
        await brand.deleteOne();
        res.status(200).json({
            message: "brand deleted successfully",
            data: null,
            status: "success",
        });
    }
    catch (error) {
        next(error);
    }
};
exports.deleteBrand = deleteBrand;
