import { Router } from "express";
import * as IPSpamChecker from "../../middleware/api.limiter";
import * as APIValidator from "../../middleware/api.validator";
import * as createProjectController from "./createProject/createProject.controller";
import * as updateProjectController from "./updateProject/updateProject.controller";
import * as deleteProjectController from "./deleteProject/deleteProject.controller";

const router = Router();

router.post(
  "/project/create",
  IPSpamChecker.checkIpSpamServer("/project-management"),
  APIValidator.createProjectValidator,
  createProjectController.createProjectController,
);

router.put(
  "/project/update",
  IPSpamChecker.checkIpSpamServer("/project-management"),
  APIValidator.projectValidator,
  updateProjectController.updateProjectController,
);

router.post(
  "/project/delete",
  IPSpamChecker.checkIpSpamServer("/projectManagement"),
  APIValidator.projectValidator,
  deleteProjectController.deleteProjectController,
);

export default router;
