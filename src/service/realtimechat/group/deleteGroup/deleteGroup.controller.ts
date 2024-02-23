import * as DeleteGroupService from "./deleteGroup.service";

export async function deleteGroupController(req: any, res: any, next: any) {
  DeleteGroupService.deleteGroupService(req, res, next);
}
