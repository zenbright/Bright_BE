import { Router } from "express";
import * as getGroupMessagesController from "./getGroupMessages.controller";
import * as IPSpamChecker from "../../../middleware/api.limiter";

const router = Router();

router.get(
  "/messages/:groupId",
  IPSpamChecker.checkIpSpamServer("/chat"),
  getGroupMessagesController.getGroupMessagesController,
);

export default router;
