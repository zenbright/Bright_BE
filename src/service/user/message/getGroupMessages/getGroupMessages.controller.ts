import * as GetGroupMessagesService from "./getGroupMessages.service";

export async function getGroupMessagesController(req: any, res: any) {
  const groupId = req.params.groupId;
  GetGroupMessagesService.getGroupMessagesService({ groupId }, res);
}
