import { Router } from "express";
import * as passwordChangeController from "./passwordChange.controller";
import * as IPSpamChecker from "../middleware/api.limiter";
import * as APIValidator from "../middleware/api.validator";

const router = Router();

router.put(
  "/Bright/passwordChange",
  IPSpamChecker.checkIpSpamServer("/auth/Bright/passwordChange"), // Check IP spam
  APIValidator.generalAccountValidator, // Validate request body
  passwordChangeController.passwordChangeController,
);

export default router;