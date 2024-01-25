import * as DeleteMessageService from "./deleteMessage.service";

export async function deleteMessageController(req: any, res: any) {
  const groupId = req.params.groupId;
  const msgId = req.params.msgId;
  DeleteMessageService.deleteMessageService({ groupId, msgId }, res);
}
