import { Router } from "express";
import * as logInController from "./login.controller";
import * as IPSpamChecker from "../middleware/api.limiter";
import * as APIValidator from "../middleware/api.validator";

const router = Router();

router.post(
  "/Bright/login",
  IPSpamChecker.checkIpSpamServer("/auth/Bright/login"), // Check IP spam
  APIValidator.generalAccountValidator, // Validate request body
  logInController.loginController,
);

export default router;
