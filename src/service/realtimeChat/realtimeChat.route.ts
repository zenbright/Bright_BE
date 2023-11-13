import { Router } from "express";
import * as realtimeChatController from "./realtimeChat.controller";
import * as IPSpamChecker from "../middleware/api.limiter";
import * as APIValidator from "../middleware/api.validator";

const router = Router();

router.put(
  "/realtimeChat",
  IPSpamChecker.checkIpSpamServer("/utils/user"), // Check IP spam
  // APIValidator.userAccountDeleteValidator,
  realtimeChatController.realtimeChatController,
);

export default router;
