"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
var api_helper_1 = require("../helper/api.helper");
var Error_1 = require("../error/Error");
var SECRET_KEY = process.env.JWT_SECRET || 'test';
var authenticateJWT = function (req, res, next) {
    var token = req.headers['authorization'];
    if (token) {
        jsonwebtoken_1.default.verify(token, SECRET_KEY, function (err, decoded) {
            if (err) {
                return (0, api_helper_1.formatAPIResponse)(res, {
                    status: Error_1.ERROR.TOKEN.INVALID_OR_EXPIRED_TOKEN.status,
                    error: (0, api_helper_1.formatError)(Error_1.ERROR.TOKEN.INVALID_OR_EXPIRED_TOKEN),
                });
            }
            if (decoded.userid) {
                req.idUser = decoded.userid;
            }
            if (decoded.adminId) {
                req.idAdmin = decoded.adminId;
            }
            next();
        });
    }
    else {
        return (0, api_helper_1.formatAPIResponse)(res, {
            status: Error_1.ERROR.TOKEN.MISSING_TOKEN.status,
            error: (0, api_helper_1.formatError)(Error_1.ERROR.TOKEN.MISSING_TOKEN),
        });
    }
};
exports.default = authenticateJWT;
