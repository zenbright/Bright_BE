import Group from "../../../../models/groupModel";
import Message from "../../../../models/groupMessageModel";
import { RESPONSE_CODE } from "../../../utils/constants";

export async function editMessageService(
  params: { groupId: string; msgId: string },
  updatedText: string,
  res: any,
) {
  try {
    const { groupId, msgId } = params;

    console.log(groupId, msgId);

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
    messageToEdit.save();

    return res.status(200).json({ message: RESPONSE_CODE.SUCCESS });
  } catch (error) {
    console.log(error);
  }
}
