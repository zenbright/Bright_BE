import { Router } from "express";
import * as getGroupsController from "./getGroups.controller";
import * as IPSpamChecker from "../../../middleware/api.limiter";

const router = Router();

router.get(
  "/groups",
  IPSpamChecker.checkIpSpamServer("/chat"),
  getGroupsController.getGroupsController,
);

export default router;
