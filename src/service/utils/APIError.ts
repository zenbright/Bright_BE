import { ERROR_CODE } from './constants';

export default class APIError extends Error {
    statusCode: any;
    errors: any;

    constructor(statusCode: any, errors: any, ...args: any) {
        super(...args);

        // Capture the stack trace of the error
        Error.captureStackTrace(this, APIError);

        // Set the error name and HTTP status code
        this.statusCode = statusCode;
        this.errors = typeof errors === 'string' ? { message: errors } : errors;
    }
}

// Handle API errors
export function handleErrorReponseAPI(error: any) {
    const defaultError = [500, ERROR_CODE.INTERNAL_SERVER_ERROR];

    try {
        const resCode = error?.response?.status;
        const resData = error?.response?.data;
        const resMessage = Array.isArray(resData?.errors) ? resData.errors[0]?.param : ERROR_CODE.INTERNAL_SERVER_ERROR;

        return [resCode || defaultError[0], resMessage || defaultError[1]];
    } catch (error) {
        return defaultError;
    }
}
