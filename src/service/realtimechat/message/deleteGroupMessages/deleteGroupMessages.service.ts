import Group from "../../../../models/groupModel";
import Message from "../../../../models/groupMessageModel";
import { RESPONSE_CODE } from "../../../utils/constants";
import { deleteMultimediaFromBucket } from "../deleteMessage/deleteMessage.service";

export async function deleteGroupMessagesService(
  params: { groupId: string },
  res: any,
) {
  try {
    const { groupId } = params;

    console.log(groupId);
    const existingGroup = await Group.findOne({ _id: groupId });

    if (!existingGroup) {
      return res.status(404).json({ error: RESPONSE_CODE.NOT_FOUND_ERROR });
    }

    // Extract message IDs from the group
    const messageIds = Array.from(existingGroup.messages);

    // Delete all multimedia in every message in the group
    await deleteAllMultimedia(messageIds);

    // Delete every message in the message database by its ID
    await Message.deleteMany({ _id: { $in: messageIds } });

    // Empty the group's messages field
    existingGroup.messages = [];
    await existingGroup.save();

    return res.status(200).json({ message: RESPONSE_CODE.SUCCESS });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: RESPONSE_CODE.INTERNAL_SERVER_ERROR });
  }
}

async function deleteAllMultimedia(messageIds: string[]) {
  for (const messageId of messageIds) {
    const messageToDelete = await Message.findOne({ _id: messageId });
    if (messageToDelete?.multimedia) {
      await deleteMultimediaFromBucket(messageToDelete.multimedia);
    }
  }
}
