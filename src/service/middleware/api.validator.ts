import { body, param } from "express-validator";
import validatorErrorHandler from "../utils/validatorErrorHandler";
import { AUTH_ACTION } from "../utils/constants";

export const tokenAPICredentialValidator = [
  body("token").isString().notEmpty().withMessage("Token API is invalid."),
  validatorErrorHandler,
];

export const loginWithGitHubValidator = [
  body("code").isString().notEmpty().withMessage("Invalid Github Auth Code."),
  validatorErrorHandler,
];

export const generalAccountValidator = [
  param("action")
    .isIn(Object.values(AUTH_ACTION))
    .withMessage("action invalid!"),
  validatorErrorHandler,
];

export const brightAccountValidator = [
  body("account").isString().notEmpty().withMessage("Invalid account."),
  validatorErrorHandler,
];

