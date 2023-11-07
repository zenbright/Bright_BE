import { Router } from "express";
import * as passwordChangeController from "./passwordChange.controller";
import * as IPSpamChecker from "../../middleware/api.limiter";
import * as APIValidator from "../../middleware/api.validator";

const router = Router();

router.put(
  "/bright/passwordChange",
  IPSpamChecker.checkIpSpamServer("/auth/bright"), // Check IP spam
  APIValidator.brightAccountValidator,
  passwordChangeController.passwordChangeController,
);

export default router;
