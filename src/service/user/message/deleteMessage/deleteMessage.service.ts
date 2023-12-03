import Group from "../../../../models/group";
import Message from "../../../../models/message";
import { RESPONSE_CODE } from "../../../utils/constants";

export async function deleteMessageService(
  params: { groupId: string; msgId: string },
  res: any,
) {
  try {
    const { groupId, msgId } = params;

    console.log(groupId, msgId);
    const existingGroup = await Group.findOne({ groupId: groupId });

    if (!existingGroup) {
      return res.status(404).json({ error: RESPONSE_CODE.NOT_FOUND_ERROR });
    }

    await removeMessageFromGroup(existingGroup, msgId, res);
    await Message.deleteOne({ messageId: msgId });

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
  existingGroup.messages.delete(messageId);
  await existingGroup.save();
}
