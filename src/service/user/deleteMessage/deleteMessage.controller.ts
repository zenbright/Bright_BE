import * as DeleteMessageService from "./deleteMessage.service";

export async function deleteMessageController(req: any, res: any, next: any) {
  DeleteMessageService.deleteMessageService(req, res, next);
}
