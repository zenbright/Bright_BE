import { Router } from "express";
import * as IPSpamChecker from "../../middleware/api.limiter";
import * as APIValidator from "../../middleware/api.validator";
import * as createProjectController from "./createProject/createProject.controller";
import * as readProjectsController from "./readProjects/readProjects.controller";
import * as updateProjectController from "./updateProject/updateProject.controller";
import * as deleteProjectController from "./deleteProject/deleteProject.controller";

const router = Router();

router.post(
  "/project",
  IPSpamChecker.checkIpSpamServer("/project-management"),
  APIValidator.createProjectValidator,
  createProjectController.createProjectController,
);

router.get(
  "/projects",
  IPSpamChecker.checkIpSpamServer("/project-management"),
  readProjectsController.readProjectsController,
);

router.put(
  "/project",
  IPSpamChecker.checkIpSpamServer("/project-management"),
  APIValidator.projectValidator,
  updateProjectController.updateProjectController,
);

router.delete(
  "/project",
  IPSpamChecker.checkIpSpamServer("/project-management"),
  APIValidator.projectValidator,
  deleteProjectController.deleteProjectController,
);

export default router;
