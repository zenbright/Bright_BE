import * as CreateProjectService from "./createProject.service";

export async function createProjectController(req: any, res: any, next: any) {
  CreateProjectService.createProjectService(req, res, next);
}