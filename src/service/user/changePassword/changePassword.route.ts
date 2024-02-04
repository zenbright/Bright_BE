import { Router } from "express";
import * as changePasswordController from "./changePassword.controller";
import * as IPSpamChecker from "../../middleware/api.limiter";
import * as APIValidator from "../../middleware/api.validator";

const router = Router();

router.put(
  "/changePassword",
  IPSpamChecker.checkIpSpamServer("/utils/user"), // Check IP spam
  APIValidator.userPasswordChangeValidator,
  changePasswordController.changePasswordController,
);

export default router;
