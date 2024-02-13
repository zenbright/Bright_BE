import * as EditMessageService from "./editMessage.service";

export async function editMessageController(req: any, res: any) {
  const groupId = req.params.groupId;
  const msgId = req.params.msgId;
  console.log("msgId: " + msgId);
  EditMessageService.editMessageService({ groupId, msgId }, req.body.updatedText, res);
}
