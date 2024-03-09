import Group from "../../../../models/groupModel";
import Message from "../../../../models/groupMessageModel";
import { RESPONSE_CODE } from "../../../utils/constants";
import { deleteSingleMultimediaFromBucket } from "../handleMediaInBucket";
import redisClient from "../../../utils/redisConfig";

export async function deleteMessageService(params: { groupId: string; msgId: string }, res: any) {
    try {
        const { groupId, msgId } = params;

        const existingGroup = await Group.findOne({ _id: groupId });
        if (!existingGroup) {
            return res.status(404).json({ error: RESPONSE_CODE.NOT_FOUND_ERROR });
        }

        const messageToDelete = await Message.findOne({ _id: msgId });
        if (!messageToDelete) {
            return res.status(404).json({ error: RESPONSE_CODE.NOT_FOUND_ERROR });
        }

        await removeMessageFromGroup(existingGroup, msgId, res);

        // Update cached data in Redis after deleting the message
        const cachedData = await redisClient.get("messages-" + groupId);
        if (cachedData) {
            const parsedData = JSON.parse(cachedData);
            parsedData.messages = parsedData.messages.filter((message: any) => message._id !== msgId);
            await redisClient.set("messages-" + groupId, JSON.stringify(parsedData));
        }

        // Additional logic to delete multimedia from bucket and message document...
        await Message.deleteOne({ _id: msgId });

        return res.status(200).json({ message: RESPONSE_CODE.SUCCESS });
    } catch (error) {
        console.log(error);
    }
}

async function removeMessageFromGroup(
  existingGroup: any,
  messageId: string,
  res: any,
) {
  existingGroup.messages = existingGroup.messages.filter(
    (message: any) => message.type !== messageId,
  );
  await existingGroup.save();
}

export async function deleteMultimediaFromBucket(multimedia: string[]) {
  for (const eachMediaId of multimedia) {
    await deleteSingleMultimediaFromBucket(eachMediaId);
  }
}

