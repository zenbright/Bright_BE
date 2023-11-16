// service/user/realtimeChat/realtimeChat.service.js
import Message from "../../../models/message";
import mongoose from "mongoose";
import Group from "../../../models/group";
import { ERROR_CODE, SUCCESS_MESSAGE } from "../../utils/constants";

export async function realtimeChatService(
  groupId: String,
  userId: String,
  data: any,
) {
  try {
    const { name, message, dateTime } = data;

    const newMessage = new Message({
      groupId: groupId,
      userId: userId,
      text: message,
      multimedia: "", // TODO: multimedia
      order: 0, // TODO: make the order dynamic
    });

    await newMessage.save();

    const newMsgId = newMessage.messageId.toString();
    const group = await Group.findOne({ groupId: groupId });

    if (group) {
      group.messages.push(newMsgId);
      await group.save();
    } else {
      return { error: "GROUP_" + ERROR_CODE.NOT_FOUND_ERROR };
    }

    return { SUCCESS_MESSAGE };
  } catch (error) {
    // TODO: Handle error
    console.error("FAILED TO SAVE MESSAGE");
  }
}
