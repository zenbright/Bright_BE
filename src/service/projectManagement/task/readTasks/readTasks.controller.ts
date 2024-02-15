import * as ReadTasksService from "./readTasks.service";

export async function readTasksController(req: any, res: any, next: any) {
  ReadTasksService.readTasksService(req, res, next);
}