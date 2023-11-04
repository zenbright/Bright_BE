import logger from '../../logger';
import { ERROR_CODE } from './constants';

export default function errorHandler(error: any, req: any, res: any, next: any) {
    const statusCode = error?.statusCode || error?.response?.status || 500;
    const payload = statusCode === 500 ? ERROR_CODE.INTERNAL_SERVER_ERROR : error.errors || error.message || ERROR_CODE.INTERNAL_SERVER_ERROR;

    if (!error?.statusCode && !error?.response?.status) {
        logger.error(error.stack);
    }

    res.status(statusCode).json({
        success: false,
        errors: payload
    });
}
