import { Router } from "express";
import * as IPSpamChecker from "../../middleware/api.limiter";
import * as APIValidator from "../../middleware/api.validator";
import * as createProjectController from "./createProject/createProject.controller";
import * as updateProjectController from "./updateProject/updateProject.controller";
import * as deleteProjectController from "./deleteProject/deleteProject.controller";

const router = Router();

router.post(
  "/createProject",
  IPSpamChecker.checkIpSpamServer("/projectManagement"),
  APIValidator.createProjectValidator,
  createProjectController.createProjectController,
);

router.put(
  "/updateProject",
  IPSpamChecker.checkIpSpamServer("/projectManagement"),
  APIValidator.projectValidator,
  updateProjectController.updateProjectController,
);

router.post(
  "/deleteProject",
  IPSpamChecker.checkIpSpamServer("/projectManagement"),
  APIValidator.projectValidator,
  deleteProjectController.deleteProjectController,
);

export default router;
