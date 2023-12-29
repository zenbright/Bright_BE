import { Router } from "express";
import * as IPSpamChecker from "../../middleware/api.limiter";
import * as APIValidator from "../../middleware/api.validator";
import * as createChecklistItemController from "./createChecklistItem/createChecklistItem.controller";
import * as updateChecklistItemController from "./updateChecklistItem/updateChecklistItem.controller";
import * as deleteChecklistItemController from "./deleteChecklistItem/deleteChecklistItem.controller";

const router = Router();

router.post(
  "/createChecklistItem",
  IPSpamChecker.checkIpSpamServer("/ProjectManagement"),
  APIValidator.createChecklistItemValidator,
  createChecklistItemController.createChecklistItemController,
);

router.put(
  "/updateChecklistItem",
  IPSpamChecker.checkIpSpamServer("/ProjectManagement"),
  APIValidator.updateChecklistItemValidator,
  updateChecklistItemController.updateChecklistItemController,
);

router.post(
  "/deleteChecklistItem",
  IPSpamChecker.checkIpSpamServer("/ProjectManagement"),
  APIValidator.deleteChecklistItemValidator,
  deleteChecklistItemController.deleteChecklistItemController,
);

export default router;
