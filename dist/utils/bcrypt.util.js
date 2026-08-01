"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.comparePassword = exports.hashPassword = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
//! hash password
const hashPassword = async (password) => {
    try {
        const salt = await bcrypt_1.default.genSalt(10);
        return await bcrypt_1.default.hash(password, salt);
    }
    catch (error) {
        console.log(error);
        throw new Error("something went wrong");
    }
};
exports.hashPassword = hashPassword;
//! compare password
const comparePassword = async (password, hash) => {
    try {
        return await bcrypt_1.default.compare(password, hash);
    }
    catch (error) {
        console.log(error);
        throw new Error("something went wrong");
    }
};
exports.comparePassword = comparePassword;
