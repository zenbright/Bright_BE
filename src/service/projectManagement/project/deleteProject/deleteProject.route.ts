import { Router } from "express";
import * as deleteProjectController from "./deleteProject.controller";
import * as IPSpamChecker from "../../../middleware/api.limiter";
import * as APIValidator from "../../../middleware/api.validator";

const router = Router();

router.post(
  "/deleteProject",
  IPSpamChecker.checkIpSpamServer("/projectManagement"), 
  APIValidator.projectValidator,
  deleteProjectController.deleteProjectController,
);

export default router;
