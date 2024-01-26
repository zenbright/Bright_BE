import * as DeleteGroupMessagesService from "./deleteGroupMessages.service";

export async function deleteGroupMessagesController(req: any, res: any) {
  const groupId = req.params.groupId;
  DeleteGroupMessagesService.deleteGroupMessagesService({ groupId}, res);
}
