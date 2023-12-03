import Message from "../../../models/message";
import Group from "../../../models/group";
import { ERROR_CODE, SUCCESS_MESSAGE } from "../../utils/constants";

export async function sendMessageService(
  groupId: String,
  userId: String,
  data: any,
) {
  try {
    const { name, message, dateTime } = data;
    /*
    data: {
    name: 'anonymous',
    message: 'haha',
    dateTime: '2023-11-28T11:59:21.879Z'
    }
    */

    const newMessage = new Message({
      groupId: groupId,
      fromId: userId,
      text: message,
      multimedia: "", // TODO: multimedia
      order: 0, // TODO: make the order dynamic
    });

    console.log("newMessage: ", newMessage);
    await newMessage.save();

    const newMsgId = newMessage.messageId.toString();
    const group = await Group.findOne({ groupId: groupId });

    if (group) {
      group.messages.push(newMsgId);
      await group.save();
    } else {
      return { error: "GROUP_" + ERROR_CODE.NOT_FOUND_ERROR };
    }

    console.log("SUCCESS");
    return { message: SUCCESS_MESSAGE, newMessage: newMessage};
  } catch (error) {
    // TODO: Handle error
    console.error(error);
    console.error("FAILED TO SAVE MESSAGE");
  }
}
