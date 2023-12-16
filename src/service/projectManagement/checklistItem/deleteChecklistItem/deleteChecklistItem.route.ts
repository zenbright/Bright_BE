import { Router } from "express";
import * as deleteChecklistItemController from "./deleteChecklistItem.controller";
import * as IPSpamChecker from "../../../middleware/api.limiter";
import * as APIValidator from "../../../middleware/api.validator";

const router = Router();

router.post(
  "/deleteChecklistItem",
  IPSpamChecker.checkIpSpamServer("/ProjectManagement"), 
  APIValidator.deleteChecklistItemValidator,
  deleteChecklistItemController.deleteChecklistItemController,
);

export default router;
