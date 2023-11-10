import { Router } from "express";
import GitAuthRoute from "./service/authentication/github/gitAuth.route";
import BrightAuthRoute from "./service/authentication/bright/brightAuth.route";
import OTPvalidationRoute from "./service/user/OTPvalidation/OTPvalidation.route";
import EmailVerificationRoute from "./service/user/emailVerification/emailVerification.route";
const router = Router();

router.use("/auth", [GitAuthRoute, BrightAuthRoute]);
router.use("/utils/user", [OTPvalidationRoute, EmailVerificationRoute]);

export default router;
