import { Router } from "express";
import * as emailVerificationController from "./emailVerification.controller";
import { IPSpamChecker, APIValidator } from "../../..";

const router = Router();

router.post(
  "/verifyEmail",
  IPSpamChecker.checkIpSpamServer("/auth/verifyEmail"),
  APIValidator.emailVerificationValidator,
  emailVerificationController.emailVerificationController,
);

export default router;
