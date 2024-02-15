import * as CreateTaskService from "./createTask.service";

export async function createTaskController(req: any, res: any, next: any) {
  CreateTaskService.createTaskService(req, res, next);
}