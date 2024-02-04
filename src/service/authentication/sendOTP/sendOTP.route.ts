import { Router } from "express";
import * as sendOTPController from "./sendOTP.controller";
import { IPSpamChecker, APIValidator } from "../../..";

const router = Router();

router.post(
  "/sendOTP",
  IPSpamChecker.checkIpSpamServer("/auth/sendOTP"),
  APIValidator.emailVerificationValidator,
  sendOTPController.sendOTPController,
);

export default router;
