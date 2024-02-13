import * as GetGroupsService from "./getGroups.service";

export async function getGroupsController(req: any, res: any) {
  GetGroupsService.getGroupsService(req, res);
}
