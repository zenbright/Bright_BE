import { Router } from "express";
import * as deleteGroupMessagesController from "./deleteGroupMessages.controller";
import * as IPSpamChecker from "../../../middleware/api.limiter";

const router = Router();

router.delete(
  "/deleteGroupMessages/:groupId",
  IPSpamChecker.checkIpSpamServer("/chat"), 
  deleteGroupMessagesController.deleteGroupMessagesController,
);

export default router;
