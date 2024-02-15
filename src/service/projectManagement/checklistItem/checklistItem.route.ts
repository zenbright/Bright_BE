import { Router } from "express";
import * as IPSpamChecker from "../../middleware/api.limiter";
import * as APIValidator from "../../middleware/api.validator";
import * as createChecklistItemController from "./createChecklistItem/createChecklistItem.controller";
import * as readChecklistItemsController from "./readChecklistItems/readChecklistItems.controller";
import * as updateChecklistItemController from "./updateChecklistItem/updateChecklistItem.controller";
import * as deleteChecklistItemController from "./deleteChecklistItem/deleteChecklistItem.controller";

const router = Router();

router.post(
  "/checklistitem",
  IPSpamChecker.checkIpSpamServer("/project-management"),
  createChecklistItemController.createChecklistItemController,
);

router.get(
  "/checklistitem",
  IPSpamChecker.checkIpSpamServer("/project-management"),
  readChecklistItemsController.readChecklistItemsController,
);

router.put(
  "/checklistitem",
  IPSpamChecker.checkIpSpamServer("/project-management"),
  APIValidator.updateChecklistItemValidator,
  updateChecklistItemController.updateChecklistItemController,
);

router.delete(
  "/checklistitem",
  IPSpamChecker.checkIpSpamServer("/project-management"),
  APIValidator.deleteChecklistItemValidator,
  deleteChecklistItemController.deleteChecklistItemController,
);

export default router;
