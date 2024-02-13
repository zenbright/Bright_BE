import Group from "../../../../models/groupModel";
import Message from "../../../../models/groupMessageModel";
import { RESPONSE_CODE } from "../../../utils/constants";
import { getMultimedia } from "../getMessage/getMessage.service";

export async function getGroupMessagesService(
  params: { groupId: string[] },
  res: any,
) {
  try {
    const { groupId } = params;

    // Use findOne instead of find if you expect only one document
    const group = await Group.findOne({ _id: groupId });

    if (!group) {
      return res.status(404).json({ error: RESPONSE_CODE.NOT_FOUND_ERROR });
    }

    const messageIds = group.messages;
    console.log("messageIds: ", messageIds);
    // Fetch messages using an array of message IDs
    const messages = await Message.find({ _id: { $in: messageIds } });

    const multimediaPromises = messages.map(async (message) => {
      return await getMultimedia(message.multimedia);
    });
    
    const allMultimedia = await Promise.all(multimediaPromises);

    return res.status(200).json({
      status: RESPONSE_CODE.SUCCESS,
      messages: messages,
      multimedia: allMultimedia,
    });
  } catch (error) {
    console.log(error);
    // Handle other errors
    return res.status(500).json({ error: RESPONSE_CODE.INTERNAL_SERVER_ERROR });
  }
}
