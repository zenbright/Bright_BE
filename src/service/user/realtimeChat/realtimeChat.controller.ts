import * as RealtimeChatService from "./realtimeChat.service";

export async function realtimeChatController(
  groupId: String,
  userId: String,
  data: any,
) {
  RealtimeChatService.realtimeChatService(groupId, userId, data);
}
