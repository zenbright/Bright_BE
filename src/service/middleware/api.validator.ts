import { body, param } from "express-validator";
import validatorErrorHandler from "../utils/validatorErrorHandler";
import { AUTH_ACTION, USER_PROFILE_IMAGE_ACTION } from "../utils/constants";

export const tokenAPICredentialValidator = [
  body("token").notEmpty().isString().withMessage("Token API is invalid."),
  validatorErrorHandler,
];

export const loginWithGitHubValidator = [
  body("code").notEmpty().isString().withMessage("Invalid Github Auth Code."),
  validatorErrorHandler,
];

export const loginWithBrightValidator = [
  param("action")
    .isIn(Object.values(AUTH_ACTION).map((action) => action.toLowerCase()))
    .withMessage("action invalid!"),
  validatorErrorHandler,
];

export const userAccountDeleteValidator = [
  body("account").notEmpty().isString().withMessage("Missing Account Field."),
  body("password").notEmpty().isString().withMessage("Missing Password Field."),
  validatorErrorHandler,
];

export const emailVerificationValidator = [
  body("userId").notEmpty().isString().withMessage(" UserID is required "),
  body("email").isString().notEmpty().withMessage("Missing Email Field."),
  validatorErrorHandler,
];

export const userProfileImageValidator = [
  param("action")
    .isIn(
      Object.values(USER_PROFILE_IMAGE_ACTION).map((action) =>
        action.toLowerCase(),
      ),
    )
    .withMessage("Action is invalid!"),
  body("userId").notEmpty().isString().withMessage(" UserID is required "),
  validatorErrorHandler,
];

export const userSearchValidator = [
  body("searchPhrase")
    .isString()
    .notEmpty()
    .withMessage("Missing search phrase."),
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

export const OTPVerificationValidator = [
  body("userId").isString().notEmpty().withMessage("Missing Id Field."),
  body("OTP").isString().notEmpty().withMessage("Missing OTP Field."),
  validatorErrorHandler,
];

export const createGroupValidator = [
  body("userCredId")
    .isString()
    .notEmpty()
    .withMessage("Missing userCredId Field."),
  body("invitedUsers")
    .isArray({ min: 1 }) // Ensure invitedUsers is an array with at least one element
    .custom((value: any) => {
      // Check if all elements in the array are strings
      if (!value.every((item: any) => typeof item === "string")) {
        throw new Error("invitedUsers must be an array of strings.");
      }
      return true;
    }),
  validatorErrorHandler,
];

export const JoinLeaveGroupValidator = [
  body("userCredId")
    .isString()
    .notEmpty()
    .withMessage("Missing userCredId Field."),
  body("groupId").isString().notEmpty().withMessage("Missing groupId Field."),
  validatorErrorHandler,
];

export const deleteGroupValidator = [
  body("groupId").isString().notEmpty().withMessage("Missing groupId Field."),
  validatorErrorHandler,
];

export const deleteMessageValidator = [
  body("groupId").isString().notEmpty().withMessage("Missing groupId Field."),
  body("messageId").isString().notEmpty().withMessage("Missing messageId Field."),
  validatorErrorHandler,
]