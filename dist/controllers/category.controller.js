"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.remove = exports.update = exports.create = exports.getById = exports.getAll = void 0;
const category_models_1 = __importDefault(require("../models/category.models"));
const customError_util_1 = __importDefault(require("../utils/customError.util"));
const cloudinary_util_1 = require("../utils/cloudinary.util");
const getAll = async (req, res, next) => {
    try {
        const filter = {};
        const { query, page = 1, perPage = 10, sortBy = "createdAt", order = "DESC" } = req.query;
        // convert query string values (always strings) into real numbers
        const currentPage = Number(page);
        const limit = Number(perPage);
        const skip = (currentPage - 1) * limit;
        if (query) {
            filter.$or = [
                {
                    name: {
                        $regex: query,
                        $options: "i",
                    },
                },
                {
                    description: {
                        $regex: query,
                        $options: "i",
                    },
                },
            ];
        }
        const category = await category_models_1.default.find(filter)
            .limit(limit)
            .skip(skip)
            .sort({ [sortBy]: order === "DESC" ? -1 : 1 });
        if (category.length === 0) {
            throw new customError_util_1.default("No category available", 400);
        }
        // total count of ALL matching documents (ignoring skip/limit),
        // needed to calculate total pages for the client
        const totalCount = await category_models_1.default.countDocuments(filter);
        res.status(200).json({
            message: "category fetch successfully",
            data: category,
            pagination: {
                currentPage,
                perPage: limit,
                totalItems: totalCount,
                totalPages: Math.ceil(totalCount / limit),
            },
            status: "success",
        });
    }
    catch (error) {
        next(error);
    }
};
exports.getAll = getAll;
const getById = async (req, res, next) => {
    try {
        const { id } = req.params;
        const category = await category_models_1.default.findOne({ _id: id });
        if (!category) {
            throw new customError_util_1.default(`category at id: ${id} not found`, 404);
        }
        res.status(200).json({
            message: "catgeory fetched successfully",
            data: category,
            status: "success",
        });
    }
    catch (error) {
        next(error);
    }
};
exports.getById = getById;
const create = async (req, res, next) => {
    try {
        const { name, description } = req.body;
        const file = req.file;
        if (!name) {
            throw new customError_util_1.default("name is required", 400);
        }
        if (!description) {
            throw new customError_util_1.default("description is required", 400);
        }
        if (!file) {
            throw new customError_util_1.default("image is required", 400);
        }
        const category = new category_models_1.default({ name, description });
        if (file) {
            const { path, public_id } = await (0, cloudinary_util_1.upload)(file, "/categories");
            category.image = {
                path,
                public_id,
            };
        }
        await category.save();
        res.status(201).json({
            message: "category created successfully",
            data: category,
            status: "success",
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
        const category = await category_models_1.default.findOne({ _id: id });
        if (!category) {
            throw new customError_util_1.default(`category at id: ${id} not found`, 404);
        }
        if (name) {
            category.name = name;
        }
        if (description) {
            category.description = description;
        }
        if (file) {
            await (0, cloudinary_util_1.deleteFromCloudinary)(category.image.public_id);
            //upload
            const { path, public_id } = await (0, cloudinary_util_1.upload)(file, "/categories");
            category.image = {
                path,
                public_id,
            };
        }
        await category.save();
        res.status(200).json({
            message: "category updated successfully",
            data: category,
            status: "success",
        });
    }
    catch (error) {
        next(error);
    }
};
exports.update = update;
const remove = async (req, res, next) => {
    try {
        const { id } = req.params;
        const category = await category_models_1.default.findOne({ _id: id });
        if (!category) {
            throw new customError_util_1.default(`Category not found at id : ${id}`, 404);
        }
        await (0, cloudinary_util_1.deleteFromCloudinary)(category.image.public_id);
        await category.deleteOne();
        res.status(200).json({
            message: "category deleted successfully",
            data: null,
            status: "success",
        });
    }
    catch (error) {
        next(error);
    }
};
exports.remove = remove;
