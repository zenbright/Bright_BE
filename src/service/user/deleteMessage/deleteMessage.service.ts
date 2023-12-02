import Group from "../../../models/group";
import Message from "../../../models/message";
import { ERROR_CODE, SUCCESS_MESSAGE } from "../../utils/constants";

export async function deleteMessageService(
  params: { groupId: string; msgId: string },
  res: any,
) {
  try {
    const { groupId, msgId } = params;

    console.log(groupId, msgId);
    const existingGroup = await Group.findOne({ groupId: groupId });

    if (!existingGroup) {
      return res.status(404).json({ error: ERROR_CODE.NOT_FOUND_ERROR });
    }

    await removeMessageFromGroup(existingGroup, msgId, res);
    await Message.deleteOne({ messageId: msgId });

    return res.status(200).json({ message: SUCCESS_MESSAGE });
  } catch (error) {
    console.log(error);
  }
}

async function removeMessageFromGroup(
  existingGroup: any,
  messageId: string,
  res: any,
) {
  // existingGroup.messages = existingGroup.messages.filter((msgId: string) => msgId !== messageId);

  // await existingGroup.save();
  
  console.log("Successfully deleted message");
  return res.status(200).json({ message: "Successfully deleted message" });
}
