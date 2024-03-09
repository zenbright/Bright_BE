import { Router } from "express";
import * as deleteMessageController from "./deleteMessage.controller";
import * as IPSpamChecker from "../../../middleware/api.limiter";

const router = Router();

router.delete(
  "/message/:groupId/:msgId",
  IPSpamChecker.checkIpSpamServer("/chat"), 
  deleteMessageController.deleteMessageController,
);

export default router;
