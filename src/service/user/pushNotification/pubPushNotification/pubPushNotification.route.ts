import { Router } from "express";
import * as pushNotificationController from "./pubPushNotification.controller";
import * as IPSpamChecker from "../../../middleware/api.limiter";
import * as APIValidator from "../../../middleware/api.validator";

const router = Router();

router.post(
  "/push-notification",
  IPSpamChecker.checkIpSpamServer("/utils/user"), // Check IP spam
//   APIValidator.userAccountDeleteValidator,
  pushNotificationController.pushNotificationController,
);

export default router;
