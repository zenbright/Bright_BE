import Group from "../../../../models/groupModel";
import Message from "../../../../models/groupMessageModel";
import { RESPONSE_CODE } from "../../../utils/constants";
import { getMultimedia } from "../getMessage/getMessage.service";
import redisClient from "../../../utils/redisConfig";
import { MessageMetadata } from "../MessageMetadata.interface";

export async function getGroupMessagesService(
  params: { groupId: string },
  res: any,
) {
  try {
    const { groupId } = params;

    // Check if data exists in Redis cache
    const cachedData = await redisClient.get("messages-" + groupId);
    if (cachedData) {
      // console.log("Cache Hit!");
      const parsedData = JSON.parse(cachedData);
      console.log("parsed data: " + parsedData);
      return res.status(200).json(parsedData);
    }

    // console.log("Cache Miss!");

    // Data not found in cache, fetch from MongoDB
    const group = await Group.findOne({ _id: groupId });

    if (!group) {
      return res.status(404).json({ error: RESPONSE_CODE.NOT_FOUND_ERROR });
    }

    const messageIds = group.messages;

    // Fetch messages using an array of message IDs
    const messages = await Message.find({ _id: { $in: messageIds } });

    const messageWithMetadata: { [key: string]: MessageMetadata } = {};

    const multimediaPromises = messages.map(async (message) => {
      const multimedia = await getMultimedia(message.multimedia);

      messageWithMetadata[message._id.toString()] = {
        data: message,
        metadata: multimedia,
      };
    });

    // Await all multimedia promises to ensure they are all resolved
    await Promise.all(multimediaPromises);

    // Store fetched data in Redis cache
    await redisClient.set(
      "messages-" + groupId,
      JSON.stringify({
        status: RESPONSE_CODE.SUCCESS,
        messages: messageWithMetadata,
      }),
    );

    return res.status(200).json({
      status: RESPONSE_CODE.SUCCESS,
      messages: messageWithMetadata,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: RESPONSE_CODE.INTERNAL_SERVER_ERROR });
  }
}
