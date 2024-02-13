import { Router } from "express";

// authentication
import GitAuthRoute from "./service/authentication/github/gitAuth.route";
import BrightAuthRoute from "./service/authentication/bright/brightAuth.route";
import SendOTPRoute from "./service/authentication/sendOTP/sendOTP.route";
import VerifyOTPRoute from "./service/authentication/verifyOTP/verifyOTP.route";
import EmailVerificationRoute from "./service/authentication/emailVerification/emailVerification.route";

// user
import UserSearchRoute from "./service/user/searchUser/searchUser.route";
import UserAccountDeleteRoute from "./service/user/deleteAccount/deleteAccount.route";
import UserProfileImageRoute from "./service/user/crudProfileImage/manageImage.route";
import UserPasswordChangeRoute from "./service/user/changePassword/changePassword.route";

// realtimechat-group
import CreateGroupRoute from "./service/realtimechat/group/createGroup/createGroup.route";
import GetGroupRoute from "./service/realtimechat/group/getGroup/getGroup.route";
import GetGroupsRoute from "./service/realtimechat/group/getGroups/getGroups.route";
import LeaveGroupRoute from "./service/realtimechat/group/leaveGroup/leaveGroup.route";
import DeleteGroupRoute from "./service/realtimechat/group/deleteGroup/deleteGroup.route";
import JoinGroupRoute from "./service/realtimechat/group/joinGroup/joinGroup.route";

// realtimechat-message
import GetMessageRoute from "./service/realtimechat/message/getMessage/getMessage.route";
import GetGroupMessagesRoute from "./service/realtimechat/message/getGroupMessages/getGroupMessages.route";
import DeleteMessageRoute from "./service/realtimechat/message/deleteMessage/deleteMessage.route";
import DeleteGroupMessagesRoute from "./service/realtimechat/message/deleteGroupMessages/deleteGroupMessages.route";

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
  GetGroupRoute,
  GetGroupsRoute,
  JoinGroupRoute,
  DeleteMessageRoute,
  GetMessageRoute,
  GetGroupMessagesRoute,
  DeleteGroupMessagesRoute,
]);

export default router;
