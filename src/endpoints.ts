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
import ProjectRoute from "./service/projectManagement/project/project.route";
import TaskRoute from "./service/projectManagement/task/task.route";
import ChecklistItemRoute from "./service/projectManagement/checklistItem/checklistItem.route";

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

router.use("/projectManagement", [ProjectRoute, TaskRoute, ChecklistItemRoute]);

export default router;
