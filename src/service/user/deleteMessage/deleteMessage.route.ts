import { Router } from "express";
import * as deleteMessageController from "./deleteMessage.controller";
import * as IPSpamChecker from "../../middleware/api.limiter";
import * as APIValidator from "../../middleware/api.validator";

const router = Router();

router.put(
  "/deleteMessage",
  IPSpamChecker.checkIpSpamServer("/utils/user"), // Check IP spam
  APIValidator.deleteMessageValidator,
  deleteMessageController.deleteMessageController,
);

export default router;
