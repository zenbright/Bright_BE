import { Router } from "express";
import * as createGroupController from "./createGroup.controller";
import * as IPSpamChecker from "../../middleware/api.limiter";
import * as APIValidator from "../../middleware/api.validator";

const router = Router();

router.put(
  "/createGroup",
  IPSpamChecker.checkIpSpamServer("/utils/user"), // Check IP spam
  APIValidator.createGroupValidator,
  createGroupController.createGroupController,
);

export default router;
