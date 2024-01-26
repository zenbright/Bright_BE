import Message from "../../../../models/groupMessageModel";
import Group from "../../../../models/groupModel";
import { RESPONSE_CODE } from "../../../utils/constants";
import mongoose from "mongoose";

export async function sendMessageService(
  groupId: String,
  userId: String,
  data: any,
) {
  try {
    const { name, message, multimedia, dateTime } = data;
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
      multimedia: multimedia,
    });

    console.log("newMessage: ", newMessage);

    await newMessage.save();

    const newMsgId = newMessage._id.toString();
    const group = await Group.findOne({ _id: groupId });

    if (group) {
      group.messages.push(newMsgId);
      await group.save();
    } else {
      return { error: "GROUP_" + RESPONSE_CODE.NOT_FOUND_ERROR };
    }

    return { status: RESPONSE_CODE.SUCCESS, newMessage: newMessage };
  } catch (error) {
    console.error(error);
  }
}
