import * as DeleteProjectService from "./deleteProject.service";

export async function deleteProjectController(req: any, res: any, next: any) {
  DeleteProjectService.deleteProjectService(req, res, next);
}
