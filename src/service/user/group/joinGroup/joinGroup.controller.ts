import * as JoinGroupService from "./joinGroup.service";

export async function joinGroupController(req: any, res: any, next: any) {
  JoinGroupService.joinGroupService(req, res, next);
}
