import { Router } from "express";
import * as IPSpamChecker from "../../middleware/api.limiter";
import * as APIValidator from "../../middleware/api.validator";
import * as createTaskController from "./createTask/createTask.controller";
import * as readTasksController from "./readTasks/readTasks.controller";
import * as updateTaskController from "./updateTask/updateTask.controller";
import * as deleteTaskController from "./deleteTask/deleteTask.controller";

const router = Router();

router.post(
  "/task",
  IPSpamChecker.checkIpSpamServer("/project-management"),
  APIValidator.createTaskValidator,
  createTaskController.createTaskController,
);

router.get(
  "/tasks",
  IPSpamChecker.checkIpSpamServer("/project-management"),
  readTasksController.readTasksController,
);

router.put(
  "/task",
  IPSpamChecker.checkIpSpamServer("/project-management"),
  APIValidator.taskValidator,
  updateTaskController.updateTaskController,
);

router.delete(
  "/task",
  IPSpamChecker.checkIpSpamServer("/project-management"),
  APIValidator.taskValidator,
  deleteTaskController.deleteTaskController,
);

export default router;
