import { body } from 'express-validator';
import validatorErrorHandler from '../utils/ValidatorErrorHandler';
export const tokenAPICredentialValidator = [
    body('token').isString().notEmpty().withMessage('Token API is invalid.'),
    validatorErrorHandler,
];
