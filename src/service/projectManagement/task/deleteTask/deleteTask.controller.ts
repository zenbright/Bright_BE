import * as DeleteTaskService from "./deleteTask.service";

export async function deleteTaskController(req: any, res: any, next: any) {
  DeleteTaskService.deleteTaskService(req, res, next);
}
