import { Router } from "express";
import * as emailVerificationController from "./emailVerification.controller";
import { IPSpamChecker, APIValidator } from "../../..";

const router = Router();

router.post(
  "/verify-email",
  IPSpamChecker.checkIpSpamServer("/utils/user"),
  APIValidator.emailVerificationValidator,
  emailVerificationController.emailVerificationController,
);

export default router;
