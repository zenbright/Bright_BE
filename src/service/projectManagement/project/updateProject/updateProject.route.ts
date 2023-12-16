import { Router } from "express";
import * as updateProjectController from "./updateProject.controller";
import * as IPSpamChecker from "../../../middleware/api.limiter";
import * as APIValidator from "../../../middleware/api.validator";

const router = Router();

router.put(
  "/updateProject",
  IPSpamChecker.checkIpSpamServer("/projectManagement"), 
  APIValidator.projectValidator,
  updateProjectController.updateProjectController,
);

export default router;