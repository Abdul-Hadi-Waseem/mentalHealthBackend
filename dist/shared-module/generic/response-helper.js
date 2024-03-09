"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GenericErrorResponse = exports.GenericSuccessPaginatedResponse = exports.GenericSuccessResponse = void 0;
function GenericSuccessResponse(data) {
    return {
        success: true,
        error: '',
        message: '',
        data: data,
    };
}
exports.GenericSuccessResponse = GenericSuccessResponse;
function GenericSuccessPaginatedResponse(data, total, page, per_page, next, previous) {
    return {
        success: true,
        error: '',
        message: '',
        data: {
            page: page,
            total: total,
            per_page: per_page,
            next: next,
            previous: previous,
            items: data,
        },
    };
}
exports.GenericSuccessPaginatedResponse = GenericSuccessPaginatedResponse;
function GenericErrorResponse(error, message = null) {
    return {
        success: false,
        error: error,
        message: '',
        data: message !== null && message !== void 0 ? message : {},
    };
}
exports.GenericErrorResponse = GenericErrorResponse;
//# sourceMappingURL=response-helper.js.map