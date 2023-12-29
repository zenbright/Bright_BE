import * as ReadProjectService from "./readProject.service";

export async function readProjectController(req: any, res: any, next: any) {
  ReadProjectService.readProjectService(req, res, next);
}