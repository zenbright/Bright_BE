import { Router } from "express";
import * as IPSpamChecker from "../../middleware/api.limiter";
import * as APIValidator from "../../middleware/api.validator";
import * as createChecklistItemController from "./createChecklistItem/createChecklistItem.controller";
import * as updateChecklistItemController from "./updateChecklistItem/updateChecklistItem.controller";
import * as deleteChecklistItemController from "./deleteChecklistItem/deleteChecklistItem.controller";

const router = Router();

router.post(
  "/checklistitem/create",
  IPSpamChecker.checkIpSpamServer("/project-management"),
  APIValidator.createChecklistItemValidator,
  createChecklistItemController.createChecklistItemController,
);

router.put(
  "/checklistitem/update",
  IPSpamChecker.checkIpSpamServer("/project-management"),
  APIValidator.updateChecklistItemValidator,
  updateChecklistItemController.updateChecklistItemController,
);

router.post(
  "/checklistitem/delete",
  IPSpamChecker.checkIpSpamServer("/project-management"),
  APIValidator.deleteChecklistItemValidator,
  deleteChecklistItemController.deleteChecklistItemController,
);

export default router;