"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var GeneralException = /** @class */ (function (_super) {
    __extends(GeneralException, _super);
    function GeneralException(code, message, status) {
        var _this = _super.call(this, message) || this;
        _this.code = '';
        _this.message = '';
        _this.status = 0;
        _this.message = message;
        _this.code = code;
        _this.status = status || 400;
        return _this;
    }
    GeneralException.formatException = function (_a) {
        var _b = _a.code, code = _b === void 0 ? 'UNKNOWN_ERROR' : _b, _c = _a.message, message = _c === void 0 ? '' : _c, _d = _a.status, status = _d === void 0 ? 500 : _d;
        return new GeneralException(code, message, status);
    };
    return GeneralException;
}(Error));
exports.default = GeneralException;
