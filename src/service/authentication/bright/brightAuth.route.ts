import { Router } from "express";
import * as brightAuthController from "./brightAuth.controller";
import { IPSpamChecker, APIValidator } from '../../..';

const router = Router();

router.post("/bright/:action",
    IPSpamChecker.checkIpSpamServer("/auth/bright"), // Check IP spam
    APIValidator.generalAccountValidator, // Validate request body
    brightAuthController.brightAuthentication, // Bright auth controller
);

export default router;
