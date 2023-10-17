import { NODE_ENV } from "../../config";

/**
 * Response handler to client
 */
export default class ResponseHandler {
    res: any;

    constructor(res: any) {
        this.res = res;
    }

    sendResponse(success: boolean, data?: object, status = 200, errors?: any) {
        const response: any = { success };

        if (data) {
            response.payload = data;
        }

        if (!success) {
            response.status = status;
            response.error = errors;
        }

        return this.res.status(success ? 200 : status).json(response);
    }

    success(data: object) {
        return this.sendResponse(true, data);
    }

    errorParam(data: any) {
        return this.sendResponse(false, {}, data.status, data.error);
    }

    error(error: any) {
        if (NODE_ENV !== 'production') {
            console.log('Errors:', error.errors);
        }
        return this.sendResponse(false, {}, error.statusCode, error.errors);
    }

    paging([count = 0, data = []], page = 1, limit = 10) {
        return this.res.status(200).json({
            success: true,
            total_page: Math.ceil(count / limit),
            total_item: count,
            page,
            item: data.length,
            payload: data
        });
    }
}
