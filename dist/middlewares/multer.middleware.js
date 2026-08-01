"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.uploader = void 0;
const fs_1 = __importDefault(require("fs"));
const multer_1 = __importDefault(require("multer"));
const path_1 = __importDefault(require("path"));
const customError_util_1 = __importDefault(require("../utils/customError.util"));
const uploader = () => {
    const folder = "uploads/";
    const fileSize = 5 * 1024 * 1024; // 5MB in bytes
    const allowed_extensions = [".png", ".jpg", ".webp", ".jpeg", ".svg", ".pdf"];
    const allowed_mimetypes = ["image/png", "image/jpeg", "image/webp", "image/jpg", "image/svg+xml", "application/pdf",];
    if (!fs_1.default.existsSync(folder)) {
        fs_1.default.mkdirSync(folder, { recursive: true });
    }
    const storage = multer_1.default.diskStorage({
        destination: (req, file, cb) => {
            cb(null, folder);
        },
        filename: (req, file, cb) => {
            const fileName = Date.now() + "-" + file.originalname;
            cb(null, fileName);
        }
    });
    const fileFilter = (req, file, cb) => {
        const file_ext = path_1.default.extname(file.originalname).toLowerCase();
        if (!allowed_extensions.includes(file_ext)) {
            cb(new customError_util_1.default(`Invalid file extension.Only ${allowed_extensions.join(",")} are allowed.`, 400));
            return;
        }
        if (!allowed_mimetypes.includes(file.mimetype)) {
            cb(new customError_util_1.default(`Invalid file extension.Only ${allowed_mimetypes.join(",")} are allowed.`, 400));
            return;
        }
        cb(null, true);
    };
    //!multer instance
    const upload = (0, multer_1.default)({ storage: storage, limits: { fileSize }, fileFilter: fileFilter });
    return upload;
};
exports.uploader = uploader;
