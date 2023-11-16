import * as SendMessageService from "./sendMessage.service";

export async function sendMessageController(
  groupId: String,
  userId: String,
  data: any,
) {
  SendMessageService.sendMessageService(groupId, userId, data);
}
