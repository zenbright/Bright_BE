import * as GetGroupService from "./getGroup.service";

export async function getGroupController(req: any, res: any) {
  const groupId = req.params.groupId;
  GetGroupService.getGroupService({ groupId }, res);
}
