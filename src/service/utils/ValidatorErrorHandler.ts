import { validationResult } from 'express-validator';
import logger from '../../logger';

export default function validatorErrorHandler(req: any, res: any, next: any) {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        const arrayErrors = errors.array();

        // Log errors for debugging
        logger.error('Validation Errors:', arrayErrors);

        return res.status(422).json({
            success: false,
            errors: arrayErrors,
        });
    }

    return next();
}
