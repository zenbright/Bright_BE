import { Router } from "express";
import GitAuthRoute from "./service/authentication/github/gitAuth.route";
import BrightAuthRoute from "./service/authentication/bright/brightAuth.route";
import SendOTPRoute from "./service/user/sendOTP/sendOTP.route";
import VerifyOTPRoute from "./service/user/verifyOTP/verifyOTP.route";
import EmailVerificationRoute from "./service/user/emailVerification/emailVerification.route";
import UserSearchRoute from "./service/user/searchUser/searchUser.route";
import UserPasswordChangeRoute from "./service/user/changePassword/changePassword.route";
import UserAccountDeleteRoute from "./service/user/deleteAccount/deleteAccount.route";

const router = Router();

router.use("/auth", [GitAuthRoute, BrightAuthRoute]);
router.use("/utils/user", [
  UserSearchRoute,
  UserPasswordChangeRoute,
  UserAccountDeleteRoute,
  SendOTPRoute,
  VerifyOTPRoute,
  EmailVerificationRoute,
]);

export default router;
