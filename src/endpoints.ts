import { Router } from "express";
import GitAuthRoute from "./service/authentication/github/gitAuth.route";
import BrightAuthRoute from "./service/authentication/bright/brightAuth.route";
import SendOTPRoute from "./service/user/sendOTP/sendOTP.route";
import EmailVerificationRoute from "./service/user/emailVerification/emailVerification.route";
const router = Router();

router.use("/auth", [GitAuthRoute, BrightAuthRoute]);
router.use("/utils/user", [SendOTPRoute, EmailVerificationRoute]);

export default router;
