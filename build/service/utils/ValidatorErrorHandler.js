import { validationResult } from 'express-validator';
import logger from '../../logger';
export default function validatorErrorHandler(req, res, next) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        const arrayErrors = errors.array();
        // Log errors
        logger.error('Validation Errors:', arrayErrors);
        return res.status(422).json({
            success: false,
            errors: arrayErrors,
        });
    }
    return next();
}
