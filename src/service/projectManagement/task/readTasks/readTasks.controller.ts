import * as ReadTasksService from "./readTasks.service";

export async function readTasksController(req: any, res: any, next: any) {
  const projectId = req.params.projectId;
  ReadTasksService.readTasksService(projectId, res, next);
}
