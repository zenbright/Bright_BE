import { Router } from "express";
import * as deleteTaskController from "./deleteTask.controller";
import * as IPSpamChecker from "../../../middleware/api.limiter";
import * as APIValidator from "../../../middleware/api.validator";

const router = Router();

router.post(
  "/deleteTask",
  IPSpamChecker.checkIpSpamServer("/projectManagement"), 
  APIValidator.taskValidator,
  deleteTaskController.deleteTaskController,
);

export default router;
