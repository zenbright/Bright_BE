import * as GetMessageService from "./getMessage.service";

export async function getMessageController(req: any, res: any) {
  const msgId = req.params.msgId;
  GetMessageService.getMessageService({ msgId }, res);
}
