import { Router } from "express";
import * as deleteAccountController from "./deleteAccount.controller";
import * as IPSpamChecker from "../../../middleware/api.limiter";
import * as APIValidator from "../../../middleware/api.validator";

const router = Router();

router.post(
  "/bright/deleteAccount",
  IPSpamChecker.checkIpSpamServer("/auth/bright"), 
  APIValidator.brightAccountValidator,
  deleteAccountController.deleteAccountController,
);

export default router;