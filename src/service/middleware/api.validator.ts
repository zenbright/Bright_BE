import { body } from 'express-validator';
import validatorErrorHandler from '../utils/validatorErrorHandler';

export const tokenAPICredentialValidator = [
    body('token').isString().notEmpty().withMessage('Token API is invalid.'),
    validatorErrorHandler,
];

export const loginWithGitHubValidator = [
    body('code').isString().notEmpty().withMessage('Invalid Github Auth Code.'),
    validatorErrorHandler,
];

export const generalAccountValidator = [
    body('code').isString().notEmpty().withMessage('Invalid Account Code.'),
    validatorErrorHandler,
];
