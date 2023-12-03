import { Router } from "express";
import * as joinGroupController from "./joinGroup.controller";
import * as IPSpamChecker from "../../../middleware/api.limiter";
import * as APIValidator from "../../../middleware/api.validator";

const router = Router();

router.put(
  "/joinGroup",
  IPSpamChecker.checkIpSpamServer("/utils/user"), // Check IP spam
  APIValidator.JoinLeaveGroupValidator,
  joinGroupController.joinGroupController,
);

export default router;
