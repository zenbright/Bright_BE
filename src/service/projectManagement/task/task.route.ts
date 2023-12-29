import { Router } from "express";
import * as IPSpamChecker from "../../middleware/api.limiter";
import * as APIValidator from "../../middleware/api.validator";
import * as createTaskController from "./createTask/createTask.controller";
import * as updateTaskController from "./updateTask/updateTask.controller";
import * as deleteTaskController from "./deleteTask/deleteTask.controller";

const router = Router();

router.post(
  "/task/create",
  IPSpamChecker.checkIpSpamServer("/project-management"),
  APIValidator.createTaskValidator,
  createTaskController.createTaskController,
);

router.put(
  "/task/update",
  IPSpamChecker.checkIpSpamServer("/project-management"),
  APIValidator.taskValidator,
  updateTaskController.updateTaskController,
);

router.post(
  "/task/delete",
  IPSpamChecker.checkIpSpamServer("/project-management"),
  APIValidator.taskValidator,
  deleteTaskController.deleteTaskController,
);

export default router;