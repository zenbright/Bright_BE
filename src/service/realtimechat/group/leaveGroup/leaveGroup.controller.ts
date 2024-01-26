import * as LeaveGroupService from "./leaveGroup.service";

export async function leaveGroupController(req: any, res: any, next: any) {
  LeaveGroupService.leaveGroupService(req, res, next);
}
