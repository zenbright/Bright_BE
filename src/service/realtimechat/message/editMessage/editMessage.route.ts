import { Router } from "express";
import * as editMessageController from "./editMessage.controller";
import * as IPSpamChecker from "../../../middleware/api.limiter";

const router = Router();

router.put(
  "/message/:groupId/:msgId",
  IPSpamChecker.checkIpSpamServer("/chat"), 
  editMessageController.editMessageController,
);

export default router;
