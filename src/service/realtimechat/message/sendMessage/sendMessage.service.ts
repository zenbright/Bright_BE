import Message from "../../../../models/groupMessageModel";
import Group from "../../../../models/groupModel";
import { RESPONSE_CODE } from "../../../utils/constants";
import mongoose from "mongoose";
import { uploadMediaToBucket } from "../handleMediaInBucket";
import redisClient from "../../../utils/redisConfig";
import { MessageMetadata } from "../MessageMetadata.interface";

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

    const multimediaObjectIds = [];
    let newMultimedia;
    for (const eachMedia of multimedia) {
      const multimediaObjectId = new mongoose.Types.ObjectId();
      const stringMultimediaObjectId = multimediaObjectId.toHexString();

      newMultimedia = await uploadMediaToBucket(stringMultimediaObjectId, eachMedia);

      multimediaObjectIds.push(stringMultimediaObjectId);
    }

    const newMessage = new Message({
      groupId: groupId,
      fromId: userId,
      text: message,
      multimedia: multimediaObjectIds,
    });

    console.log("newMessage: ", newMessage);

    await newMessage.save();

    const newMsgId = newMessage._id.toString();
    const group = await Group.findOne({ _id: groupId });

    const newMessageMetadata = {
      data: newMessage,
      metadata: newMultimedia,
    };

    if (group) {
      group.messages.push(newMsgId);
      await group.save();
    } else {
      return { error: "GROUP_" + RESPONSE_CODE.NOT_FOUND_ERROR };
    }

     // Update cached data in Redis after saving the new message
     const cachedData = await redisClient.get("messages-" + groupId);
     if (cachedData) {
      const parsedData = JSON.parse(cachedData);
      console.log("parsed data: ", parsedData);
  
      // Ensure parsedData.messages is an array
      if (!Array.isArray(parsedData.messages)) {
          parsedData.messages = [];
      }
  
      // Push newMessageMetadata to parsedData.messages
      parsedData.messages.push(newMessageMetadata);
  
      await redisClient.set(
          "messages-" + groupId,
          JSON.stringify(parsedData)
      );
  }


    return { status: RESPONSE_CODE.SUCCESS, newMessage: newMessageMetadata };
  } catch (error) {
    console.error(error);
  }
}
