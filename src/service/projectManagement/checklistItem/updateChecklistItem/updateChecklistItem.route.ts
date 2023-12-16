import { Router } from "express";
import * as updateChecklistItemController from "./updateChecklistItem.controller";
import * as IPSpamChecker from "../../../middleware/api.limiter";
import * as APIValidator from "../../../middleware/api.validator";

const router = Router();

router.post(
  "/updateChecklistItem",
  IPSpamChecker.checkIpSpamServer("/ProjectManagement"), 
  APIValidator.updateChecklistItemValidator,
  updateChecklistItemController.updateChecklistItemController,
);

export default router;
