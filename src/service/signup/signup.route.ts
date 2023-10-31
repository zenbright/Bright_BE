import { Router } from "express";
import * as SignUpController from "./signup.controller";
import * as IPSpamChecker from "../middleware/api.limiter";
import * as APIValidator from "../middleware/api.validator";

const router = Router();

router.post(
  "/Bright/signup",
  IPSpamChecker.checkIpSpamServer("/auth/Bright/signup"), // Check IP spam
  APIValidator.generalAccountValidator, // Validate request body
  SignUpController.signupController, // Handle request
);

export default router;
