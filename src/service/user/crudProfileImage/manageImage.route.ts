import { Router } from "express";
import * as ManageUserProfileImageController from "./manageImage.controller";
import { IPSpamChecker, APIValidator } from "../../..";
import multer from "multer";

const router = Router();
const upload = multer();

router.post("/profileImage/:action",
  upload.fields([
    { name: 'userId', maxCount: 1 },
    { name: 'imageFile', maxCount: 1 },
  ]),
  IPSpamChecker.checkIpSpamServer("/userProfileImage"),
  APIValidator.userProfileImageValidator,
  ManageUserProfileImageController.userProfileImageController
)
export default router;
