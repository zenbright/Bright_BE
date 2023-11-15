import Group from "../../../models/group";
import userCredentials from "../../../models/userCredentials";
import { ERROR_CODE, SUCCESS_MESSAGE } from "../../utils/constants";

// Join an existing group
export async function joinGroupService(req: any, res: any, next: any) {
  try {
    const { userCredId, groupId } = req.body;

    const group = await Group.findOne({
      groupId: groupId,
    });

    if (!group) {
      return res.status(404).json({ error: ERROR_CODE.NOT_FOUND_ERROR });
    }

    const userCred = await userCredentials.findOne({
      userId: userCredId,
    });

    if (!userCred) {
      return res.status(404).json({ error: ERROR_CODE.USER_NOT_FOUND });
    }

    // Check if the userCred is already in the group
    if (group.users.includes(userCredId)) {
      return res.status(400).json({ error: "USER_EXISTS_IN_GROUP" });
    }

    // Add the userCred to the group
    group.users.push(userCredId);

    // Save the modified group document
    await group.save();
    return res.status(200).json({ message: SUCCESS_MESSAGE });
  } catch (error) {
    next(error);
  }
}
