"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const errorHandler_middleware_1 = require("./middlewares/errorHandler.middleware");
const auth_routes_1 = __importDefault(require("./routes/auth.routes"));
const brand_routes_1 = __importDefault(require("./routes/brand.routes"));
const category_routes_1 = __importDefault(require("./routes/category.routes"));
const product_routes_1 = __importDefault(require("./routes/product.routes"));
const customError_util_1 = __importDefault(require("./utils/customError.util"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const app = (0, express_1.default)();
//! inbuilt middleware
app.use(express_1.default.json());
app.use((0, cookie_parser_1.default)());
//! using routes
app.use("/api/auth", auth_routes_1.default);
app.use("/api/brand", brand_routes_1.default);
app.use("/api/category", category_routes_1.default);
app.use("/api/product", product_routes_1.default);
//! health route
app.get("/", (req, res, next) => {
    res.status(200).json({
        message: "health route is working",
        status: "success",
        success: true,
        data: null,
    });
});
//! path not found route
app.use("/", (req, res, next) => {
    const message = `can not ${req.method} on ${req.path}`;
    // res.status(404).json({
    //     message,
    //     status:"fail",
    //     success:false,
    //     data:null,
    // });
    // const error:any=new Error(message);
    // error.status='fail';
    // error.statusCode=404;
    next(new customError_util_1.default(message, 404));
});
app.use(errorHandler_middleware_1.errorHandler);
exports.default = app;
