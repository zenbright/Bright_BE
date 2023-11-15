// service/user/realtimeChat/realtimeChat.service.js
import Message from "../../../models/message";
import Group from "src/models/group";
import { ERROR_CODE, SUCCESS_MESSAGE } from "../../utils/constants";

export async function realtimeChatService(groupId: String, userId: String, data: any) {
  try {
    const { name, message, dateTime } = data;
    
    // groupId, fromId, toId, isSeen, multimedia, timestamp, order
    await storeNewMessage(
      groupId,
      userId, // fromId
      false, // isSeen
      message, // text
      "", // TODO: multimedia
      dateTime, // timestamp
      0, // TODO: make the order dynamic
    );
  } catch (error) {
    // Handle error
    console.error(ERROR_CODE);
  }
}

async function storeNewMessage(
  groupId: String,
  fromId: String,
  isSeen: Boolean,
  text: String,
  multimedia: String,
  timestamp: Date,
  order: Number,
) {
  const newMessage = new Message({
    groupId,
    fromId,
    isSeen,
    text,
    multimedia,
    timestamp,
    order,
  });

  await newMessage.save();
}

// async function findGroupId(groupId: string) {
//   // Find the existing credential with account
//   const group = await Group.findOne({
//     groupId: groupId
//   });
// }
