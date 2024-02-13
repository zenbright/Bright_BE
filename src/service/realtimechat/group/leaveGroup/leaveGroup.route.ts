import { Router } from "express";
import * as leaveGroupController from "./leaveGroup.controller";
import * as IPSpamChecker from "../../../middleware/api.limiter";
import * as APIValidator from "../../../middleware/api.validator";

const router = Router();

router.put(
  "/leave/group",
  IPSpamChecker.checkIpSpamServer("/utils/user"), // Check IP spam
  APIValidator.JoinLeaveGroupValidator,
  leaveGroupController.leaveGroupController,
);

export default router;
