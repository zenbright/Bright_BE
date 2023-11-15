import { Router } from "express";
import * as deleteGroupController from "./deleteGroup.controller";
import * as IPSpamChecker from "../../middleware/api.limiter";
import * as APIValidator from "../../middleware/api.validator";

const router = Router();

router.post(
  "/deleteGroup",
  IPSpamChecker.checkIpSpamServer("/utils/user"), // Check IP spam
  APIValidator.deleteGroupValidator,
  deleteGroupController.deleteGroupController,
);

export default router;
