import * as CreateGroupService from "./createGroup.service";

export async function createGroupController(req: any, res: any, next: any) {
  CreateGroupService.createGroupService(req, res, next);
}
