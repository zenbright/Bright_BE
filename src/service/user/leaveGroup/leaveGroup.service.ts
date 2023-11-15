import userCredentials from "../../../models/userCredentials";
import Group from "../../../models/group";
import { ERROR_CODE, SUCCESS_MESSAGE } from "../../utils/constants";

export async function leaveGroupService(req: any, res: any, next: any) {
  try {
    const { userCredId, groupId } = req.body;

    const userCred = await userCredentials.findOne({ userId: userCredId });

    if (!userCred) {
      return res.status(404).json({ error: ERROR_CODE.USER_NOT_FOUND });
    }

    const existingGroup = await Group.findOne({ groupId: groupId });

    if (!existingGroup) {
      return res
        .status(404)
        .json({ error: "GROUP_" + ERROR_CODE.NOT_FOUND_ERROR });
    }

    const modifiedGroup = await removeUserFromGroup(existingGroup, userCredId);

    if (modifiedGroup.users.length === 0) {
      await Group.deleteOne({ groupId: groupId });
    } else {
      await existingGroup.save();
    }

    return res.status(200).json({ message: SUCCESS_MESSAGE });
  } catch (error) {
    next(error);
  }
}

async function removeUserFromGroup(existingGroup: any, userCredId: string) {
  const userIndex = existingGroup.users.indexOf(userCredId);

  if (userIndex !== -1) {
    existingGroup.users.splice(userIndex, 1);
  }

  return existingGroup;
}
