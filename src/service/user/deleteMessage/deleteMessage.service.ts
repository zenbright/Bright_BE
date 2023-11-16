import Group from "../../../models/group";
import { ERROR_CODE, SUCCESS_MESSAGE } from "../../utils/constants";

export async function deleteMessageService(req: any, res: any, next: any) {
  try {
    const { groupId, messageId } = req.body;

    const existingGroup = await Group.findOne({ groupId: groupId });

    if (!existingGroup) {
      return res
        .status(404)
        .json({ error: "GROUP_" + ERROR_CODE.NOT_FOUND_ERROR });
    }

    await removeMessageFromGroup(existingGroup, messageId, res);

    return res.status(200).json({ message: SUCCESS_MESSAGE });
  } catch (error) {
    next(error);
  }
}

async function removeMessageFromGroup(
  existingGroup: any,
  messageId: string,
  res: any,
) {
  const messageIndex = existingGroup.messages.indexOf(messageId);

  if (messageIndex !== -1) {
    existingGroup.messages.splice(messageIndex, 1);
  } else {
    return res
      .status(404)
      .json({ error: "Message_" + ERROR_CODE.NOT_FOUND_ERROR });
  }

  return existingGroup;
}
