import { Router } from "express";
import * as manageImageController from "./manageImage.controller";
import { IPSpamChecker, APIValidator } from "../../../../";
import multer from "multer"; // npm i @types/multer

const router = Router();

const storage = multer.memoryStorage(); // Use memory storage for simplicity
const upload = multer({ storage: storage });

router.post(
  "/saveImage",
  upload.single("image"),
  IPSpamChecker.checkIpSpamServer("/auth"), // Check IP spam
  APIValidator.imageValidator, // Validate request body
  manageImageController.saveImageController, // Bright auth controller
);

router.post(
  "/getImage",
  IPSpamChecker.checkIpSpamServer("/auth"), // Check IP spam
  // APIValidator.generalAccountValidator, // Validate request body
  manageImageController.getImageController, // Bright auth controller
);

export default router;
