import { Router } from "express";
import * as createChecklistItemController from "./createChecklistItem.controller";
import * as IPSpamChecker from "../../../middleware/api.limiter";
import * as APIValidator from "../../../middleware/api.validator";

const router = Router();

router.post(
  "/createChecklistItem",
  IPSpamChecker.checkIpSpamServer("/ProjectManagement"), 
  APIValidator.createChecklistItemValidator,
  createChecklistItemController.createChecklistItemController,
);

export default router;
