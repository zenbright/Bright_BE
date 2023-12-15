import { Router } from "express";
import * as createProjectController from "./createProject.controller";
import * as IPSpamChecker from "../../../middleware/api.limiter";
import * as APIValidator from "../../../middleware/api.validator";

const router = Router();

router.post(
  "/createProject",
  IPSpamChecker.checkIpSpamServer("/projectManagement"), 
  APIValidator.createProjectValidator,
  createProjectController.createProjectController,
);

export default router;
