import { Router } from "express";
import * as verifyOTPController from "./verifyOTP.controller";
import { IPSpamChecker, APIValidator } from "../../..";

const router = Router();

router.post(
  "/verifyOTP",
  IPSpamChecker.checkIpSpamServer("/utils/user"),
  APIValidator.OTPValidator,
  verifyOTPController.verifyOTPController,
);

export default router;
