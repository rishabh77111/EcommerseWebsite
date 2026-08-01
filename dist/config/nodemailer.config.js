"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifySMTP = exports.transporter = void 0;
const nodemailer_1 = __importDefault(require("nodemailer"));
const env_config_1 = __importDefault(require("./env.config"));
//! trasporter
exports.transporter = nodemailer_1.default.createTransport({
    host: env_config_1.default.MAIL_HOST,
    service: env_config_1.default.MAIL_SERVICE,
    port: env_config_1.default.MAIL_PORT,
    secure: env_config_1.default.MAIL_SECURE,
    auth: {
        user: env_config_1.default.MAIL_USER,
        pass: env_config_1.default.MAIL_PASS,
    },
});
const verifySMTP = async () => {
    try {
        await exports.transporter.verify();
        console.log("server is ready to send mail");
    }
    catch (error) {
        console.log(error);
    }
};
exports.verifySMTP = verifySMTP;
