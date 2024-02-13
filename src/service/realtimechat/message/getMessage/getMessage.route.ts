import { Router } from "express";
import * as getMessageController from "./getMessage.controller";
import * as IPSpamChecker from "../../../middleware/api.limiter";

const router = Router();

router.get(
  "/message/:msgId",
  IPSpamChecker.checkIpSpamServer("/chat"),
  getMessageController.getMessageController,
);

export default router;