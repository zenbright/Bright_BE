import { Router } from "express";
import GitAuthRoute from "./service/authentication/github/gitAuth.route";
import BrightAuthRoute from "./service/authentication/bright/brightAuth.route";
import UserSearchRoute from "./service/user/searchUser/searchUser.route";
import UserAccountDeleteRoute from "./service/user/deleteAccount/deleteAccount.route";
import CreateGroupRoute from "./service/user/group/createGroup/createGroup.route";
import LeaveGroupRoute from "./service/user/group/leaveGroup/leaveGroup.route";
import DeleteGroupRoute from "./service/user/group/deleteGroup/deleteGroup.route";
import JoinGroupRoute from "./service/user/group/joinGroup/joinGroup.route";
import DeleteMessageRoute from "./service/user/message/deleteMessage/deleteMessage.route";
import SendOTPRoute from "./service/authentication/sendOTP/sendOTP.route";
import VerifyOTPRoute from "./service/authentication/verifyOTP/verifyOTP.route";
import EmailVerificationRoute from "./service/authentication/emailVerification/emailVerification.route";
import UserProfileImageRoute from "./service/user/crudProfileImage/manageImage.route";
import UserPasswordChangeRoute from "./service/user/changePassword/changePassword.route";

const router = Router();

router.use("/auth", [
  GitAuthRoute,
  BrightAuthRoute,
  SendOTPRoute,
  VerifyOTPRoute,
  EmailVerificationRoute,
]);

router.use("/utils/user", [
  UserSearchRoute,
  UserPasswordChangeRoute,
  UserAccountDeleteRoute,
  UserProfileImageRoute,
]);

router.use("/chat", [
  CreateGroupRoute,
  LeaveGroupRoute,
  DeleteGroupRoute,
  JoinGroupRoute,
  DeleteMessageRoute,
]);

export default router;
