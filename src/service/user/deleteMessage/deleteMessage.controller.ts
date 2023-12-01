import * as DeleteMessageService from "./deleteMessage.service";

export async function deleteMessageController(req: any, res: any) {
  DeleteMessageService.deleteMessageService(req, res);
}
