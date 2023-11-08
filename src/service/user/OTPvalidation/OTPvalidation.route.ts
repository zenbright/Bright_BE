import { Router } from "express";
import * as OTPvalidationController from "./OTPvalidation.controller";
import { IPSpamChecker, APIValidator } from "../../..";

const router = Router();

router.post(
  "/utils/user/validate-otp",
  IPSpamChecker.checkIpSpamServer("/utils/user"),
  APIValidator.OTPvalidationValidator,
  OTPvalidationController.OTPvalidationController,
);

export default router;
