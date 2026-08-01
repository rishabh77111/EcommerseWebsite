"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.newArrivals = exports.getFeatured = exports.getByBrand = exports.getByCategory = exports.remove = exports.update = exports.create = exports.getById = exports.getAll = void 0;
const product_model_1 = __importDefault(require("../models/product.model"));
const customError_util_1 = __importDefault(require("../utils/customError.util"));
const cloudinary_util_1 = require("../utils/cloudinary.util");
const catchAsync_util_1 = require("../utils/catchAsync.util");
const getAll = async (req, res, next) => {
    try {
        // Fetch all products
        const products = await product_model_1.default.find();
        // Check if no products exist
        if (products.length === 0) {
            throw new customError_util_1.default("No products available", 404);
        }
        res.status(200).json({
            message: "Products fetched successfully",
            data: products,
            status: "success",
        });
    }
    catch (error) {
        next(error);
    }
};
exports.getAll = getAll;
//* get by id
exports.getById = (0, catchAsync_util_1.catchAsync)(async (req, res) => {
    const { id } = req.params;
    const product = await product_model_1.default.findOne({ _id: id });
    if (!product)
        throw new customError_util_1.default("product not found", 404);
    res.status(200).json({
        message: `product:${id} fetched`,
        data: product,
    });
});
//* create
exports.create = (0, catchAsync_util_1.catchAsync)(async (req, res) => {
    const { name, price, description, is_featured, new_arrival, stock, brand, category } = req.body;
    const { cover_image, images } = req.files;
    if (!name)
        throw new customError_util_1.default("name is required", 400);
    if (!price)
        throw new customError_util_1.default("price is required", 400);
    if (!description)
        throw new customError_util_1.default("description is required", 400);
    if (!stock)
        throw new customError_util_1.default("stock is required", 400);
    if (!brand)
        throw new customError_util_1.default("brand is required", 400);
    if (!category)
        throw new customError_util_1.default("category is required", 400);
    if (!cover_image[0])
        throw new customError_util_1.default("cover_image is required", 400);
    const product = new product_model_1.default({
        name,
        price,
        description,
        is_featured,
        new_arrival,
        stock,
        brand,
        category,
    });
    //*cover image
    const folder = "/products";
    const { path, public_id } = await (0, cloudinary_util_1.upload)(cover_image[0], folder);
    product.cover_image = {
        path,
        public_id,
    };
    // Promise.all(arr) //
    // Promise.allSettled()
    //*images
    if (images && images.length > 0) {
        const promises = images.map((file) => (0, cloudinary_util_1.upload)(file, folder));
        const files = await Promise.allSettled(promises);
        const successImages = files
            .filter((file) => file.status == "fulfilled")
            .map((file) => file.value);
        product.set("images", successImages);
    }
    //*save
    await product.save();
    res.status(201).json({
        message: "product created",
        data: product,
    });
});
//* update
exports.update = (0, catchAsync_util_1.catchAsync)(async (req, res) => {
    const { id } = req.params;
    const { name, price, description, is_featured, new_arrival, stock, brand, category, deleted_images, } = req.body;
    const { cover_image, images } = req.files;
    const product = await product_model_1.default.findOne({ _id: id });
    if (!product)
        throw new customError_util_1.default("product not found", 404);
    if (name)
        product.name = name;
    if (description)
        product.description = description;
    if (price)
        product.price = price;
    if (category)
        product.category = category;
    if (brand)
        product.brand = brand;
    if (stock)
        product.stock = stock;
    if (is_featured)
        product.is_featured = is_featured;
    if (new_arrival)
        product.new_arrival = new_arrival;
    const folder = "/products";
    //* cover image — : added cover_image && check so it doesn't
    //* crash when no new cover image is sent during an update
    if (cover_image && cover_image[0]) {
        await (0, cloudinary_util_1.deleteFromCloudinary)(product.cover_image.public_id);
        const { path, public_id } = await (0, cloudinary_util_1.upload)(cover_image[0], folder);
        product.cover_image = { path, public_id };
    }
    //* if deleted images —: implemented actual delete logic
    if (deleted_images && Array.isArray(deleted_images) && deleted_images.length > 0) {
        await Promise.allSettled(deleted_images.map((publicId) => (0, cloudinary_util_1.deleteFromCloudinary)(publicId)));
        const filteredImages = product.images.filter((img) => !deleted_images.includes(img.public_id));
        product.set("images", filteredImages);
    }
    //* if new images — implemented actual upload + append logic
    if (images && images.length > 0) {
        const promises = images.map((file) => (0, cloudinary_util_1.upload)(file, folder));
        const results = await Promise.allSettled(promises);
        const successImages = results
            .filter((r) => r.status === "fulfilled")
            .map((r) => r.value);
        product.set("images", [...product.images, ...successImages]);
    }
    //* save
    await product.save();
    res.status(200).json({
        message: `product:${id} updated`,
        data: product,
    });
});
//* delete
exports.remove = (0, catchAsync_util_1.catchAsync)(async (req, res) => {
    const { id } = req.params;
    const product = await product_model_1.default.findOne({ _id: id });
    if (!product)
        throw new customError_util_1.default("product not found", 404);
    await (0, cloudinary_util_1.deleteFromCloudinary)(product.cover_image.public_id);
    if (product.images && product.images.length > 0) {
        await Promise.allSettled(product.images.map((img) => (0, cloudinary_util_1.deleteFromCloudinary)(img.public_id)));
    }
    await product.deleteOne();
    res.status(200).json({
        message: "product deleted",
        data: product,
    });
});
//* get by category
exports.getByCategory = (0, catchAsync_util_1.catchAsync)(async (req, res) => {
    const { categoryId } = req.params;
    const products = await product_model_1.default.find({ category: categoryId })
        .populate("category")
        .populate("brand");
    res.status(200).json({
        message: `product by category:${categoryId} fetched`,
        data: products,
    });
});
//* get by brand
exports.getByBrand = (0, catchAsync_util_1.catchAsync)(async (req, res) => {
    const { brandId } = req.params;
    const products = await product_model_1.default.findOne({ brand: brandId })
        .populate("category")
        .populate("brand");
    res.status(200).json({
        message: `product by brand:${brandId} fetched`,
        data: products,
    });
});
//* get featured products
exports.getFeatured = (0, catchAsync_util_1.catchAsync)(async (req, res) => {
    const products = await product_model_1.default.find({ is_featured: true })
        .populate("category")
        .populate("brand");
    res.status(200).json({
        message: `featured product fetched`,
        data: products,
    });
});
//* get new arrivals
exports.newArrivals = (0, catchAsync_util_1.catchAsync)(async (req, res) => {
    const products = await product_model_1.default.find({ new_arrival: true })
        .populate("category")
        .populate("brand");
    res.status(200).json({
        message: `new arrival product fetched`,
        data: products,
    });
});
