import mongoose from "mongoose";
import userCredentials from "../../../../models/userCredentialsModel";
import Group from "../../../../models/group";
import { RESPONSE_CODE } from "../../../utils/constants";

export async function createGroupService(req: any, res: any, next: any) {
  try {
    const { userCredId, invitedUsers } = req.body;

    const userCred = await userCredentials.findOne({
      userId: userCredId,
    });

    if (!userCred) {
      return res.status(404).json({ error: RESPONSE_CODE.USER_NOT_FOUND });
    } else {
      // check if every invited user exists
      const invitedUserPromises = invitedUsers.map(
        async (invitedUser: String) => {
          const invitedUserCred = await userCredentials.findOne({
            userId: invitedUser,
          });
          if (!invitedUserCred) {
            throw new Error(RESPONSE_CODE.USER_NOT_FOUND);
          }
        },
      );

      await Promise.all(invitedUserPromises);

      // After checking every user exists, create a new group
      const groupMembers = [...invitedUsers, userCredId];

      // Check if the group already exists with the same members
      const existingGroup = await Group.findOne({ users: groupMembers });

      if (existingGroup) {
        console.log("existingGroup: " + existingGroup.groupId);
        return res
          .status(400)
          .json({ message: "ERROR_CODE.GROUP_ALREADY_EXISTS" });
      }

      // If the group doesn't exist, create a new one
      const newGroup = new Group({
        groupId: new mongoose.Types.ObjectId(),
        users: groupMembers,
      });

      console.log("newGroup: " + newGroup.groupId);
      await newGroup.save();
      return res.status(200).json({ message: RESPONSE_CODE.SUCCESS });
    }
  } catch (error) {
    next(error);
  }
}
