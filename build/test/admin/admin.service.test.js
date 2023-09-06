"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var dotenv_1 = require("dotenv");
(0, dotenv_1.config)();
var chai_1 = require("chai");
var mongodb_databaseconnector_1 = require("../../configuration/mongodb.databaseconnector");
var string_helper_1 = require("../../helper/string.helper");
var admin_model_1 = __importDefault(require("../../model/admin.model"));
var Error_1 = require("../../error/Error");
var bcrypt_1 = __importDefault(require("bcrypt"));
var admin_service_1 = require("../../service/admin.service");
describe('Admin Service', function () {
    before(function () { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, (0, mongodb_databaseconnector_1.connectDB)()];
                case 1:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    }); });
    after(function () { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, (0, mongodb_databaseconnector_1.closeConnexion)()];
                case 1:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    }); });
    describe('authenticate Admin', function () {
        var testEmail = "karohy".concat((0, string_helper_1.generateRandomString)(4), "@karohy.mg");
        var testMdp = (0, string_helper_1.generateRandomString)(8);
        var adminTest = {
            firstname: (0, string_helper_1.generateRandomString)(10),
            lastname: (0, string_helper_1.generateRandomString)(20),
            email: testEmail,
            password: testMdp,
            phoneNumber: '+261332212345',
        };
        before(function () { return __awaiter(void 0, void 0, void 0, function () {
            return __generator(this, function (_a) {
                try {
                    bcrypt_1.default.hash(testMdp, 10, function (err, hashed) { return __awaiter(void 0, void 0, void 0, function () {
                        var admin;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0:
                                    admin = new admin_model_1.default(__assign(__assign({}, adminTest), { password: hashed }));
                                    return [4 /*yield*/, admin.save()];
                                case 1:
                                    _a.sent();
                                    return [2 /*return*/];
                            }
                        });
                    }); });
                }
                catch (err) {
                    console.error(err);
                }
                return [2 /*return*/];
            });
        }); });
        it('should authenticate an admin with valid email and password', function () { return __awaiter(void 0, void 0, void 0, function () {
            var user;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, (0, admin_service_1.authenticateAdmin)(testEmail, testMdp)];
                    case 1:
                        user = (_a.sent());
                        (0, chai_1.expect)(user).to.exist;
                        (0, chai_1.expect)(user.email).to.equal(adminTest.email);
                        return [2 /*return*/];
                }
            });
        }); });
        it('should throw GeneralException with ERROR_INVALID_EMAIL for invalid email', function () { return __awaiter(void 0, void 0, void 0, function () {
            var invalidEmail, password, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        invalidEmail = 'invalidemail';
                        password = 'somepassword';
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, (0, admin_service_1.authenticateAdmin)(invalidEmail, password)];
                    case 2:
                        _a.sent();
                        return [3 /*break*/, 4];
                    case 3:
                        error_1 = _a.sent();
                        (0, chai_1.expect)(error_1.code).to.equal(Error_1.ERROR.AUTHENTICATION.INVALID_EMAIL.code);
                        (0, chai_1.expect)(error_1.message).to.equal(Error_1.ERROR.AUTHENTICATION.INVALID_EMAIL.message);
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        }); });
        it('should throw GeneralException with ERROR_INVALID_PASSWORD for empty password', function () { return __awaiter(void 0, void 0, void 0, function () {
            var email, emptyPassword, error_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        email = 'validuser@example.com';
                        emptyPassword = '';
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, (0, admin_service_1.authenticateAdmin)(email, emptyPassword)];
                    case 2:
                        _a.sent();
                        return [3 /*break*/, 4];
                    case 3:
                        error_2 = _a.sent();
                        (0, chai_1.expect)(error_2.code).to.equal(Error_1.ERROR.AUTHENTICATION.INVALID_PASSWORD.code);
                        (0, chai_1.expect)(error_2.message).to.equal(Error_1.ERROR.AUTHENTICATION.INVALID_PASSWORD.message);
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        }); });
        it('should throw GeneralException with ERROR_INVALID_CREDENTIALS for invalid credentials', function () { return __awaiter(void 0, void 0, void 0, function () {
            var invalidUser, error_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        invalidUser = {
                            email: "invalid".concat(adminTest.email),
                            motDePasse: 'invalidpassword',
                        };
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, (0, admin_service_1.authenticateAdmin)(invalidUser.email, invalidUser.motDePasse)];
                    case 2:
                        _a.sent();
                        return [3 /*break*/, 4];
                    case 3:
                        error_3 = _a.sent();
                        (0, chai_1.expect)(error_3.code).to.equal(Error_1.ERROR.AUTHENTICATION.INVALID_CREDENTIALS.code);
                        (0, chai_1.expect)(error_3.message).to.contain(Error_1.ERROR.AUTHENTICATION.INVALID_CREDENTIALS.message);
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        }); });
        after(function () { return __awaiter(void 0, void 0, void 0, function () {
            var err_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, admin_model_1.default.deleteOne({ email: adminTest.email })];
                    case 1:
                        _a.sent();
                        return [3 /*break*/, 3];
                    case 2:
                        err_1 = _a.sent();
                        console.error(err_1);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        }); });
    });
});
