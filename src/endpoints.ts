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
import CreateProjectRoute from "./service/projectManagement/project/createProject/createProject.route";
import UpdateProjectRoute from "./service/projectManagement/project/updateProject/updateProject.route";
import DeleteProjectRoute from "./service/projectManagement/project/deleteProject/deleteProject.route";
import CreateTaskRoute from "./service/projectManagement/task/createTask/createTask.route";
import UpdateTaskRoute from "./service/projectManagement/task/updateTask/updateTask.route";
import DeleteTaskRoute from "./service/projectManagement/task/deleteTask/deleteTask.route";
import CreateChecklistItemRoute from "./service/projectManagement/checklistItem/createChecklistItem/createChecklistItem.route";
import UpdateChecklistItemRoute from "./service/projectManagement/checklistItem/updateChecklistItem/updateChecklistItem.route";

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

router.use("/projectManagement", [
  CreateProjectRoute,
  UpdateProjectRoute,
  DeleteProjectRoute,
  CreateTaskRoute,
  UpdateTaskRoute,
  DeleteTaskRoute,
  CreateChecklistItemRoute,
  UpdateChecklistItemRoute,
]);

export default router;
