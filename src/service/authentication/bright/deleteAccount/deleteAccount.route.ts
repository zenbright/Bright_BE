import { Router } from "express";
import * as deleteAccountController from "./deleteAccount.controller";
import * as IPSpamChecker from "../../../middleware/api.limiter";
import * as APIValidator from "../../../middleware/api.validator";

const router = Router();

// If it's "/bright/deleteAccount", then it goes to /bright/:action since both are post
router.post(
  "/deleteAccount",
  IPSpamChecker.checkIpSpamServer("/auth"), 
  APIValidator.brightAccountValidator,
  deleteAccountController.deleteAccountController,
);

export default router;