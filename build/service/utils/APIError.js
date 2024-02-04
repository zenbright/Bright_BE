import { RESPONSE_CODE } from './constants';
export default class APIError extends Error {
    constructor(statusCode, errors, ...args) {
        super(...args);
        // Capture the stack trace of the error
        Error.captureStackTrace(this, APIError);
        // Set the error name and HTTP status code
        this.statusCode = statusCode;
        this.errors = typeof errors === 'string' ? { message: errors } : errors;
    }
}
// Handle API errors
export function handleErrorReponseAPI(error) {
    var _a, _b, _c;
    const defaultError = [500, RESPONSE_CODE.INTERNAL_SERVER_ERROR];
    try {
        const resCode = (_a = error === null || error === void 0 ? void 0 : error.response) === null || _a === void 0 ? void 0 : _a.status;
        const resData = (_b = error === null || error === void 0 ? void 0 : error.response) === null || _b === void 0 ? void 0 : _b.data;
        const resMessage = Array.isArray(resData === null || resData === void 0 ? void 0 : resData.errors) ? (_c = resData.errors[0]) === null || _c === void 0 ? void 0 : _c.param : RESPONSE_CODE.INTERNAL_SERVER_ERROR;
        return [resCode || defaultError[0], resMessage || defaultError[1]];
    }
    catch (error) {
        return defaultError;
    }
}
