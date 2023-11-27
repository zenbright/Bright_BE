import { Router } from "express";
import * as manageImageController from "./manageImage.controller";
import { IPSpamChecker, APIValidator } from "../../../../";
import multer from "multer"; // npm i @types/multer
import path from "path";

const router = Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./src/service/authentication/bright/manageImage/uploads"); // Set a desired upload directory
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, file.fieldname + "-" + uniqueSuffix + path.extname(file.originalname));
  },
}); // Use memory storage for simplicity
const upload = multer({
  storage: storage,
});

router.post(
  "/saveImage",
  upload.single("image"),
  IPSpamChecker.checkIpSpamServer("/auth"), // Check IP spam
  APIValidator.imageValidator, // Validate request body
  manageImageController.saveImageController, // Bright auth controller
);

/*
Request Body: [Object: null prototype] { userInfoId: 'wedfd' }
Request File: {
  fieldname: 'image',
  originalname: 'ì\x8A¤í\x81¬ë¦°ì\x83· 2023-10-31 145929.png',
  encoding: '7bit',
  mimetype: 'image/png',
  buffer: <Buffer 89 50 4e 47 0d 0a 1a 0a 00 00 00 0d 49 48 44 52 00 00 02 be 00 00 01 e4 08 06 00 00 00 d8 7a 2c 79 00 00 00 01 73 52 47 42 00 ae ce 1c e9 00 00 00 04 ... 70530 more bytes>,
  size: 70580
}
 */

router.post(
  "/getImage",
  IPSpamChecker.checkIpSpamServer("/auth"), // Check IP spam
  // APIValidator.generalAccountValidator, // Validate request body
  manageImageController.getImageController, // Bright auth controller
);

export default router;
