import { body, param } from "express-validator";
import validatorErrorHandler from "../utils/validatorErrorHandler";
import { AUTH_ACTION } from "../utils/constants";

export const tokenAPICredentialValidator = [
  body("token").notEmpty().isString().withMessage("Token API is invalid."),
  validatorErrorHandler,
];

export const loginWithGitHubValidator = [
  body("code").notEmpty().isString().withMessage("Invalid Github Auth Code."),
  validatorErrorHandler,
];

export const loginWithBrightValidator = [
  param("action").isIn(Object.values(AUTH_ACTION)).withMessage("action invalid!"),
  validatorErrorHandler,
];

export const userAccountDeleteValidator = [
  body("account").notEmpty().isString().withMessage("Missing Account Field."),
  body("password").notEmpty().isString().withMessage("Missing Password Field."),
  validatorErrorHandler,
];

export const imageValidator = [
  body("userInfoId")
    .notEmpty()
    .withMessage("The userInfoId field is required.")
    .isString()
    .withMessage("Invalid userInfoId type."),
  body("image")
    .custom((value, { req }) => {
      if (req == undefined) {
        throw new Error(
          "The image field is required.",
        );
      }
      const allowedExtensions = ["png", "jpg", "jpeg"];
      console.log("req.file: " + req.file);
      const fileExtension = req.file.originalname
        .split(".")
        .pop()
        .toLowerCase();

      if (!allowedExtensions.includes(fileExtension)) {
        throw new Error(
          "Invalid file format. Supported formats: PNG, JPG, JPEG.",
        );
      }

      return true; // Validation passed if file format is correct
    }),

  body("account").isString().notEmpty().withMessage("Missing Account Field."),
  body("provider").isString().notEmpty().withMessage("Missing Provider Field."),
  validatorErrorHandler,
];

export const userPasswordChangeValidator = [
  body("account").isString().notEmpty().withMessage("Missing Account Field."),
  body("provider").isString().notEmpty().withMessage("Missing Provider Field."),
  body("newPassword").isString().notEmpty().withMessage("Missing New password Field."),
  validatorErrorHandler,
];
