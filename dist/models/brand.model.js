"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const brandSchema = new mongoose_1.default.Schema({
    name: {
        type: String,
        unique: [true, "brand already exists with provided name"],
        trim: true,
    },
    description: {
        type: String,
        minLength: 25,
        trim: true,
    },
    logo: {
        path: {
            type: String,
            required: true,
        },
        public_id: {
            type: String,
            required: true,
        }
    }
}, { timestamps: true, toJSON: { transform: (doc, ret) => {
            delete ret._id;
            delete ret.__v;
            // keep ret.id if you still want a clean id field, or delete that too
        } } });
const Brand = mongoose_1.default.model("brand", brandSchema);
exports.default = Brand;
