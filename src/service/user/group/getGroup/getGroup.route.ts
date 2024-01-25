import { Router } from "express";
import * as getGroupController from "./getGroup.controller";
import * as IPSpamChecker from "../../../middleware/api.limiter";

const router = Router();

router.get(
  "/getGroup/:groupId",
  IPSpamChecker.checkIpSpamServer("/chat"),
  getGroupController.getGroupController,
);

export default router;
