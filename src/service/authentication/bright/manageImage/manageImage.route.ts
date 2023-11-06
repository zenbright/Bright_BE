import { Router } from "express";
import * as manageImageController from "./manageImage.controller";
import { IPSpamChecker, APIValidator } from "../../../../";

const router = Router();

router.post(
  "/saveImage",
  IPSpamChecker.checkIpSpamServer("/auth"), // Check IP spam
  APIValidator.generalAccountValidator, // Validate request body
  manageImageController.saveImageController, // Bright auth controller
);

router.post(
  "/getImage",
  IPSpamChecker.checkIpSpamServer("/auth"), // Check IP spam
  APIValidator.generalAccountValidator, // Validate request body
  manageImageController.getImageController, // Bright auth controller
);

export default router;
