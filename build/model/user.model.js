"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = __importDefault(require("mongoose"));
var userSchema = new mongoose_1.default.Schema({
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
    birthdate: {
        type: Date,
        required: true,
    },
    phoneNumber: {
        type: String,
        required: true,
    },
}, {
    collection: 'user',
});
var User = mongoose_1.default.model('User', userSchema);
// User.formatLoginUser = (user) => {
//   return {
//     _id: user._id,
//     firstname: user.prenom,
//     lastname: user.nom,
//     email: user.email,
//     birth_date: user.dateNaissance,
//     phone_number: user.numTelephone,
//   };
// };
// User.formatRegisterUser = (user) => {
//   return {
//     _id: user._id,
//     firstname: user.prenom,
//     lastname: user.nom,
//     email: user.email,
//     birth_date: user.dateNaissance,
//     phone_number: user.numTelephone,
//   };
// };
exports.default = User;
