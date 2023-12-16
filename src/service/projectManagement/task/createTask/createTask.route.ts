import { Router } from "express";
import * as createTaskController from "./createTask.controller";
import * as IPSpamChecker from "../../../middleware/api.limiter";
import * as APIValidator from "../../../middleware/api.validator";

const router = Router();

router.post(
  "/createTask",
  IPSpamChecker.checkIpSpamServer("/TaskManagement"), 
  APIValidator.createTaskValidator,
  createTaskController.createTaskController,
);

export default router;
