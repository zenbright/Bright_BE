import Group from "../../../../models/groupModel";
import { RESPONSE_CODE } from "../../../utils/constants";

export async function deleteGroupService(req: any, res: any, next: any) {
  try {
    const { groupId } = req.body;

    const group = await Group.findOne({
      groupId: groupId,
    });

    if (!group) {
      return res.status(404).json({ error: RESPONSE_CODE.NOT_FOUND_ERROR });
    }

    await Group.deleteOne({ groupId: groupId });
    return res.status(200).json({ message: RESPONSE_CODE.SUCCESS });
  } catch (error) {
    next(error);
  }
}
