import { Router } from "express";
import * as deleteAccountController from "./deleteAccount.controller";
import * as IPSpamChecker from "../../middleware/api.limiter";
import * as APIValidator from "../../middleware/api.validator";

const router = Router();

router.put(
  "/utils/user/deleteAccount",
  IPSpamChecker.checkIpSpamServer("/utils/user"), // Check IP spam
  APIValidator.userAccountDeleteValidator,
  deleteAccountController.deleteAccountController,
);

export default router;
