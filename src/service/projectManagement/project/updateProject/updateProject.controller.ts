import * as UpdateProjectService from "./updateProject.service";

export async function updateProjectController(req: any, res: any, next: any) {
  UpdateProjectService.updateProjectService(req, res, next);
}
