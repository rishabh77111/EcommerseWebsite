"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const authenticate_middleware_1 = require("../middlewares/authenticate.middleware");
const product_controller_1 = require("../controllers/product.controller");
const multer_middleware_1 = require("../middlewares/multer.middleware");
const enum_type_1 = require("../@types/enum.type");
const router = (0, express_1.Router)();
const upload = (0, multer_middleware_1.uploader)();
router.get("/", product_controller_1.getAll);
router.get("/featured", product_controller_1.getFeatured);
router.get("/new-arrivals", product_controller_1.newArrivals);
router.get("/category/:categoryId", product_controller_1.getByCategory);
router.get("/brand/:brandId", product_controller_1.getByBrand);
router.get("/:id", product_controller_1.getById);
// {cover_image:[{}] , images:[{},{},{}] , field:[{},{}]}
router.post("/", (0, authenticate_middleware_1.authenticate)([enum_type_1.Role.ADMIN, enum_type_1.Role.SUPER_ADMIN]), upload.fields([
    {
        name: "cover_image",
        maxCount: 1,
    },
    {
        name: "images",
        maxCount: 5,
    },
]), product_controller_1.create);
router.put("/:id", (0, authenticate_middleware_1.authenticate)([enum_type_1.Role.ADMIN, enum_type_1.Role.SUPER_ADMIN]), upload.fields([
    { name: "cover_image", maxCount: 1 },
    { name: "images", maxCount: 5 },
]), product_controller_1.update);
router.delete("/:id", (0, authenticate_middleware_1.authenticate)([enum_type_1.Role.ADMIN, enum_type_1.Role.SUPER_ADMIN]), product_controller_1.remove);
exports.default = router;
