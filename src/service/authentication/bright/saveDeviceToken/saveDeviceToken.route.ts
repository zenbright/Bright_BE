import { Router } from "express";
import * as saveDeviceTokenController from "./saveDeviceToken.controller";
import { IPSpamChecker, APIValidator } from "../../../..";

const router = Router();

router.post(
  "/save-device-token",
  IPSpamChecker.checkIpSpamServer("/auth/save-device-token"),
  APIValidator.saveDeviceTokenValidator,
  saveDeviceTokenController.saveDeviceTokenController,
);

export default router;
