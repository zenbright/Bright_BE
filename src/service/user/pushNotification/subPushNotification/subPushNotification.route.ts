import { Router } from "express";
import * as subController from "./subPushNotification.controller";
import * as IPSpamChecker from "../../../middleware/api.limiter";
// import * as APIValidator from "../../middleware/api.validator";

const router = Router();

router.get(
  "/push-notification",
  IPSpamChecker.checkIpSpamServer("/utils/user"), // Check IP spam
//   APIValidator.userAccountDeleteValidator,
  subController.subController,
);

export default router;
