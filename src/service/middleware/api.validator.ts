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

export const loginWithBrightValidator = [
  param("action")
    .isIn(Object.values(AUTH_ACTION))
    .withMessage("action invalid!"),
  validatorErrorHandler,
];

export const userAccountDeleteValidator = [
  body("account").isString().notEmpty().withMessage("Missing Account Field."),
  body("password").isString().notEmpty().withMessage("Missing Password Field."),
  validatorErrorHandler,
];

export const emailVerificationValidator = [
  body("email").isString().notEmpty().withMessage("Missing Email Field."),
  validatorErrorHandler,
];