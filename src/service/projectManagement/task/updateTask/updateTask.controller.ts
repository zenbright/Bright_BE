import * as UpdateTaskService from "./updateTask.service";

export async function updateTaskController(req: any, res: any, next: any) {
  UpdateTaskService.updateTaskService(req, res, next);
}
