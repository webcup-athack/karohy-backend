"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.formatError = exports.formatAPIResponse = void 0;
function formatError(err) {
    return {
        code: err.code,
        message: err.message,
    };
}
exports.formatError = formatError;
function formatAPIResponse(response, args) {
    var isSuccess = function (status) {
        return !(status >= 400 && status < 600);
    };
    var responseJson = {
        success: isSuccess(args.status),
        message: args.message || '',
        datas: isSuccess(args.status) ? args.datas : null,
    };
    if (!isSuccess(args.status)) {
        if (args.error) {
            responseJson.error = formatError(args.error);
        }
    }
    return response.status(args.status).json(responseJson);
}
exports.formatAPIResponse = formatAPIResponse;
