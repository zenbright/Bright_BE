import { Router } from "express";
import * as getGroupMessagesController from "./getGroupMessages.controller";
import * as IPSpamChecker from "../../../middleware/api.limiter";

const router = Router();

router.get(
  "/getGroupMessages/:groupId",
  IPSpamChecker.checkIpSpamServer("/chat"),
  getGroupMessagesController.getGroupMessagesController,
);

export default router;
