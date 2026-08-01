"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = void 0;
const jsonwebtoken_1 = require("jsonwebtoken");
const errorHandler = (error, req, res, next) => {
    console.log(error);
    let message = error?.message ?? "something went wrong";
    const status = error?.status ?? "error";
    let statusCode = error?.statusCode ?? 500;
    if (error instanceof jsonwebtoken_1.JsonWebTokenError) {
        message: 'Invalid token. Access denied';
        statusCode: 401;
    }
    if (error instanceof jsonwebtoken_1.TokenExpiredError) {
        message: 'Token Expired. Access denied';
        statusCode: 401;
    }
    res.status(statusCode).json({
        message,
        status,
        data: null,
        stack: error?.stack,
    });
};
exports.errorHandler = errorHandler;
