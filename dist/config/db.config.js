"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.connectDB = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const connectDB = async (DB_URI) => {
    try {
        await mongoose_1.default.connect(DB_URI);
        console.log("Database connected");
    }
    catch (error) {
        console.log(error);
        console.log("Database not connected");
    }
};
exports.connectDB = connectDB;
