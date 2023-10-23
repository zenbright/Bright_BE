import { body } from 'express-validator';
import validatorErrorHandler from '../utils/ValidatorErrorHandler';

export const tokenAPICredentialValidator = [
    body('token').isString().notEmpty().withMessage('Token API is invalid.'),
    validatorErrorHandler,
];

export const loginWithGitHubValidator = [
    body('code').isString().notEmpty().withMessage('Acess Code is invalid.'),
    validatorErrorHandler,
];
