import { Router } from "express";
import * as verifyOTPController from "./verifyOTP.controller";
import { IPSpamChecker, APIValidator } from "../../..";

const router = Router();

router.post(
  "/verifyOTP",
  IPSpamChecker.checkIpSpamServer("/auth/verifyOTP"),
  APIValidator.OTPVerificationValidator,
  verifyOTPController.verifyOTPController,
);

export default router;
