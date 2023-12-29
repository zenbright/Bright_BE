import * as ReadTaskService from "./readTask.service";

export async function readTaskController(req: any, res: any, next: any) {
  ReadTaskService.readTaskService(req, res, next);
}