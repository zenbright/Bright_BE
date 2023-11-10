import { Router } from "express";
import * as OTPvalidationController from "./OTPvalidation.controller";
import { IPSpamChecker, APIValidator } from "../../..";

const router = Router();

router.post(
  "/validate-otp",
  IPSpamChecker.checkIpSpamServer("/utils/user"),
  APIValidator.emailVerificationValidator,
  OTPvalidationController.OTPvalidationController,
);

export default router;
