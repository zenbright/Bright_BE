import mongoose from "mongoose";
import userCredentials from "../../../models/userCredentials";
import Group from "../../../models/group";
import { ERROR_CODE, SUCCESS_MESSAGE } from "../../utils/constants";

export async function leaveGroupService(req: any, res: any, next: any) {
  try {
    const { userCredId, groupId } = req.body;

    const userCred = await userCredentials.findOne({
      userId: userCredId,
    });

    if (!userCred) {
      return res.status(404).json({ error: ERROR_CODE.USER_NOT_FOUND });
    } else {
     
      // Check if the group already exists with the same members
      const existingGroup = await Group.findOne({ groupId: groupId });

      if (!existingGroup) {
        return res.status(404).json({ error: "GROUP_" + ERROR_CODE.NOT_FOUND_ERROR});
      }

      // Check if userCredId exists in the users list
      const userIndex = existingGroup.users.indexOf(userCredId);

      if (userIndex === -1) {
        return res.status(404).json({ error: ERROR_CODE.USER_NOT_FOUND });
      }

      // Remove the userCredId from the users list in existingGroup
      existingGroup.users.splice(userIndex, 1);

      // Save the modified group document
      console.log("existingGroup users: " + existingGroup.users);
      await existingGroup.save();
      return res.status(200).json({ message: SUCCESS_MESSAGE });
    }
  } catch (error) {
    next(error);
  }
}
