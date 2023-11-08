import { Router } from "express";
import * as passwordChangeController from "./passwordChange.controller";
import * as IPSpamChecker from "../../middleware/api.limiter";
import * as APIValidator from "../../middleware/api.validator";

const router = Router();

router.put(
  "/passwordChange",
  IPSpamChecker.checkIpSpamServer("/utils/user"), // Check IP spam
  APIValidator.userPasswordChangeValidator,
  passwordChangeController.passwordChangeController,
);

export default router;
