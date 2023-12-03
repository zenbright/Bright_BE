import { Router } from "express";
import GitAuthRoute from "./service/authentication/github/gitAuth.route";
import BrightAuthRoute from "./service/authentication/bright/brightAuth.route";
import UserSearchRoute from "./service/user/searchUser/searchUser.route";
import UserPasswordChangeRoute from "./service/user/passwordChange/passwordChange.route";
import UserAccountDeleteRoute from "./service/user/deleteAccount/deleteAccount.route";
import CreateGroupRoute from "./service/user/group/createGroup/createGroup.route";
import LeaveGroupRoute from "./service/user/group/leaveGroup/leaveGroup.route";
import DeleteGroupRoute from "./service/user/group/deleteGroup/deleteGroup.route";
import JoinGroupRoute from "./service/user/group/joinGroup/joinGroup.route";
import DeleteMessageRoute from "./service/user/message/deleteMessage/deleteMessage.route";
// import SendMessageRoute from "./service/user/sendMessage/sendMessage.route";

const router = Router();

router.use("/auth", [GitAuthRoute, BrightAuthRoute]);
router.use("/utils/user", [
  UserSearchRoute,
  UserPasswordChangeRoute,
  UserAccountDeleteRoute,
  CreateGroupRoute,
  LeaveGroupRoute,
  DeleteGroupRoute,
  JoinGroupRoute,
  DeleteMessageRoute
  // SendMessageRoute,
]);

export default router;
