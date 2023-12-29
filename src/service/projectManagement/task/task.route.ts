import { Router } from "express";
import * as IPSpamChecker from "../../middleware/api.limiter";
import * as APIValidator from "../../middleware/api.validator";
import * as createTaskController from "./createTask/createTask.controller";
import * as updateTaskController from "./updateTask/updateTask.controller";
import * as deleteTaskController from "./deleteTask/deleteTask.controller";

const router = Router();

router.post(
  "/createTask",
  IPSpamChecker.checkIpSpamServer("/TaskManagement"),
  APIValidator.createTaskValidator,
  createTaskController.createTaskController,
);

router.put(
  "/updateTask",
  IPSpamChecker.checkIpSpamServer("/projectManagement"),
  APIValidator.taskValidator,
  updateTaskController.updateTaskController,
);

router.post(
  "/deleteTask",
  IPSpamChecker.checkIpSpamServer("/projectManagement"),
  APIValidator.taskValidator,
  deleteTaskController.deleteTaskController,
);

export default router;
