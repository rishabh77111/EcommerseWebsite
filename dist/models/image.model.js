"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ImageSchema = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
exports.ImageSchema = new mongoose_1.default.Schema({
    path: {
        type: String,
        required: [true, "image path is required"],
    },
    public_id: {
        type: String,
        required: [true, "image public_id is required"],
    },
    //  profile_image: {
    // path: {
    //   type: String,
    //   required: true,
    // },
    // public_id: {
    //   type: String,
    //   required: true,
    // },
}, { _id: false });
