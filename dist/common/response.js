"use strict";
// src/common/response.ts
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendResponse = exports.StatusCode = void 0;
var StatusCode;
(function (StatusCode) {
    StatusCode[StatusCode["Success"] = 200] = "Success";
    StatusCode[StatusCode["Created"] = 201] = "Created";
    StatusCode[StatusCode["BadRequest"] = 400] = "BadRequest";
    StatusCode[StatusCode["Unauthorized"] = 401] = "Unauthorized";
    StatusCode[StatusCode["Forbidden"] = 403] = "Forbidden";
    StatusCode[StatusCode["NotFound"] = 404] = "NotFound";
    StatusCode[StatusCode["ServerError"] = 500] = "ServerError";
})(StatusCode || (exports.StatusCode = StatusCode = {}));
const sendResponse = (res, data) => {
    const { status, message, data: responseData } = data;
    const response = {
        status,
    };
    if (message) {
        response.message = message;
    }
    if (responseData) {
        response.data = responseData;
    }
    res.status(status).json(response);
};
exports.sendResponse = sendResponse;
