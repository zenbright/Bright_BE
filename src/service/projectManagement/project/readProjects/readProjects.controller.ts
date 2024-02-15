import * as ReadProjectsService from "./readProjects.service";

export async function readProjectsController(req: any, res: any, next: any) {
  ReadProjectsService.readProjectsService(req, res, next);
}