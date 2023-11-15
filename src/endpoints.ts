import { Router } from "express";
import GitAuthRoute from "./service/authentication/github/gitAuth.route";
import BrightAuthRoute from "./service/authentication/bright/brightAuth.route";
import UserSearchRoute from "./service/user/searchUser/searchUser.route";
import UserPasswordChangeRoute from "./service/user/passwordChange/passwordChange.route";
import UserAccountDeleteRoute from "./service/user/deleteAccount/deleteAccount.route";
import CreateGroupRoute from "./service/user/createGroup/createGroup.route";
import LeaveGroupRoute from "./service/user/leaveGroup/leaveGroup.route";
import DeleteGroupRoute from "./service/user/deleteGroup/deleteGroup.route";
// import RealtimeChatRoute from "./service/user/realtimeChat/realtimeChat.route";

const router = Router();

router.use("/auth", [GitAuthRoute, BrightAuthRoute]);
router.use("/utils/user", [
  UserSearchRoute,
  UserPasswordChangeRoute,
  UserAccountDeleteRoute,
  CreateGroupRoute,
  LeaveGroupRoute,
  DeleteGroupRoute
  // RealtimeChatRoute,
]);

export default router;
