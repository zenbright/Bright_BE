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

export const emailVerificationValidator = [
  body("email").isString().notEmpty().withMessage("Missing Email Field."),
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
  body("account").isString().notEmpty().withMessage("Missing Account Field."),
  body("provider").isString().notEmpty().withMessage("Missing Provider Field."),
  body("fullname").isString().notEmpty().withMessage("Missing fullname Field."),
  validatorErrorHandler,
];

export const OTPValidator = [
  body("account").isString().notEmpty().withMessage("Missing Account Field."),
  body("userTypedOTP").isString().notEmpty().withMessage("Missing OTP Field."),
  validatorErrorHandler,
];
