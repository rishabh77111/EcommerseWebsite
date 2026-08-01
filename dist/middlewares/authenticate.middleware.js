"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authenticate = void 0;
const customError_util_1 = __importDefault(require("../utils/customError.util"));
const jwt_util_1 = require("../utils/jwt.util");
const authenticate = (roles) => {
    return (req, res, next) => {
        try {
            // console.log(req.cookies);
            //!get access token
            const cookies = req.cookies;
            const access_token = cookies["access_token"];
            if (!access_token) {
                throw new customError_util_1.default("Unauthroized.Access denied", 401);
            }
            //! verify token-401
            const decoded_data = (0, jwt_util_1.verifyToken)(access_token);
            if (!decoded_data) {
                throw new customError_util_1.default("Invalid to.Access denied", 401);
            }
            //!check role-403
            if (roles && !roles.includes(decoded_data.role)) {
                throw new customError_util_1.default("Forbidden. can not access this resource", 403);
            }
            req.user = {
                _id: decoded_data._id,
                email: decoded_data.email,
                role: decoded_data.role,
            };
            next();
        }
        catch (error) {
            next(error);
        }
    };
};
exports.authenticate = authenticate;
