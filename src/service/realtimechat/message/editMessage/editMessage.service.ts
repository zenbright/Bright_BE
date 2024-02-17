import Group from "../../../../models/groupModel";
import Message from "../../../../models/groupMessageModel";
import { RESPONSE_CODE } from "../../../utils/constants";
import redisClient from "../../../utils/redisConfig";

export async function editMessageService(
    params: { groupId: string; msgId: string },
    updatedText: string,
    res: any
) {
    try {
        const { groupId, msgId } = params;

        const existingGroup = await Group.findOne({ _id: groupId });
        if (!existingGroup) {
            return res.status(404).json({ error: RESPONSE_CODE.NOT_FOUND_ERROR });
        }

        const messageToEdit = await Message.findOne({ _id: msgId });
        if (!messageToEdit) {
            return res.status(404).json({ error: RESPONSE_CODE.NOT_FOUND_ERROR });
        }

        messageToEdit.text = updatedText;
        messageToEdit.isEdited = true;
        messageToEdit.edit_timestamp = new Date();
        await messageToEdit.save();

        // Update cached data in Redis after editing the message
        const cachedData = await redisClient.get("messages-" + groupId);
        if (cachedData) {
            const parsedData = JSON.parse(cachedData);
            const editedMessageIndex = parsedData.messages.findIndex(
                (message: any) => message._id === msgId
            );
            if (editedMessageIndex !== -1) {
                parsedData.messages[editedMessageIndex].text = updatedText;
                parsedData.messages[editedMessageIndex].isEdited = true;
                parsedData.messages[editedMessageIndex].edit_timestamp = new Date();
                await redisClient.set(
                    "messages-" + groupId,
                    JSON.stringify(parsedData)
                );
            }
        }

        return res.status(200).json({ message: RESPONSE_CODE.SUCCESS });
    } catch (error) {
        console.log(error);
    }
}
