import { Router } from "express";
import GitAuthRoute from "./service/authentication/github/gitAuth.route";
import BrightAuthRoute from "./service/authentication/bright/brightAuth.route";
import SendOTPRoute from "./service/authentication/sendOTP/sendOTP.route";
import VerifyOTPRoute from "./service/authentication/verifyOTP/verifyOTP.route";
import EmailVerificationRoute from "./service/authentication/emailVerification/emailVerification.route";
import UserProfileImageRoute from "./service/user/crudProfileImage/manageImage.route";
import UserSearchRoute from "./service/user/searchUser/searchUser.route";
import UserPasswordChangeRoute from "./service/user/changePassword/changePassword.route";
import UserAccountDeleteRoute from "./service/user/deleteAccount/deleteAccount.route";
import GoogleAuthRoute from "./service/authentication/google/googleAuth.route";

const router = Router();

router.use("/auth", [
  GitAuthRoute,
  BrightAuthRoute,
  SendOTPRoute,
  VerifyOTPRoute,
  EmailVerificationRoute,
  GoogleAuthRoute,
]);

router.use("/utils/user", [
  UserSearchRoute,
  UserPasswordChangeRoute,
  UserAccountDeleteRoute,
  UserProfileImageRoute,
]);

export default router;
