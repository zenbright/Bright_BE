import { Router } from "express";
import * as updateTaskController from "./updateTask.controller";
import * as IPSpamChecker from "../../../middleware/api.limiter";
import * as APIValidator from "../../../middleware/api.validator";

const router = Router();

router.put(
  "/updateTask",
  IPSpamChecker.checkIpSpamServer("/projectManagement"), 
  APIValidator.updateTaskValidator,
  updateTaskController.updateTaskController,
);

export default router;
