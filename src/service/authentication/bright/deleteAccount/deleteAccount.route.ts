import { Router } from "express";
import * as deleteAccountController from "./deleteAccount.controller";
import * as IPSpamChecker from "src/service/middleware/api.limiter";
import * as APIValidator from "src/service/middleware/api.validator";

const router = Router();

router.put(
  "/bright/deleteAccount",
  IPSpamChecker.checkIpSpamServer("/auth/bright"), // Check IP spam
  APIValidator.brightAccountValidator,
  deleteAccountController.deleteAccountController,
);

export default router;