import { body } from 'express-validator';
import validatorErrorHandler from '../utils/ValidatorErrorHandler';

export const tokenAPICredentialValidator = [
    body('token').isString().notEmpty().withMessage('Token API is invalid.'),
    validatorErrorHandler,
];

export const tokenAuthorizeApiValidator = [
    body('tokenAPI').isString().notEmpty().withMessage('Token API is invalid.'),
    validatorErrorHandler,
];