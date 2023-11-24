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
  body("provider").isString().notEmpty().withMessage("Missing Provider Field."),
  validatorErrorHandler,
];

export const userPasswordChangeValidator = [
  body("account").isString().notEmpty().withMessage("Missing Account Field."),
  body("provider").isString().notEmpty().withMessage("Missing Provider Field."),
  body("newPassword")
    .isString()
    .notEmpty()
    .withMessage("Missing New password Field."),
  validatorErrorHandler,
];

export const userSearchValidator = [
  body("searchPhrase").isString().notEmpty().withMessage("Missing searchInput Field."),
  validatorErrorHandler,
];
