"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = __importDefault(require("mongoose"));
var adminSchema = new mongoose_1.default.Schema({
    firstname: {
        type: String,
        required: true,
    },
    lastname: {
        type: String,
        default: '',
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    phoneNumber: {
        type: String,
        required: true,
    },
}, {
    collection: 'admin',
});
var Admin = mongoose_1.default.model('Admin', adminSchema);
exports.default = Admin;
