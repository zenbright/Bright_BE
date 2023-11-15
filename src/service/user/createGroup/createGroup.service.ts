import mongoose from "mongoose";
import userCredentials from "../../../models/userCredentials";
import Group from "../../../models/group";
import { ERROR_CODE, SUCCESS_MESSAGE } from "../../utils/constants";

export async function createGroupService(req: any, res: any, next: any) {
  try {
    // getEveryUser();
    const { userCredId, invitedUsers } = req.body;

    const userCred = await userCredentials.findOne({
      userId: userCredId,
    });

    if (!userCred) {
      return res.status(404).json({ error: ERROR_CODE.USER_NOT_FOUND });
    } else {
      // check if every invited user exists using Promise.all
      const invitedUserPromises = invitedUsers.map(async (invitedUser: String) => {
        const invitedUserCred = await userCredentials.findOne({
          userId: invitedUser,
        });
        if (!invitedUserCred) {
          throw new Error(ERROR_CODE.USER_NOT_FOUND);
        }
      });

      // Wait for all promises to resolve
      await Promise.all(invitedUserPromises);

      // After checking every user exists, create a new group
      const groupMembers = [...invitedUsers, userCredId];

      // Check if the group already exists with the same members
      const existingGroup = await Group.findOne({ users: groupMembers });

      if (existingGroup) {
        // console.log("existingGroup: " + existingGroup.groupId);
        return res.status(400).json({ message: "ERROR_CODE.GROUP_ALREADY_EXISTS" });
      }

      // If the group doesn't exist, create a new one
      const newGroup = new Group({
        groupId: new mongoose.Types.ObjectId(),
        users: groupMembers,
      });

      await newGroup.save();
      return res.status(200).json({ message: SUCCESS_MESSAGE });
    }
  } catch (error) {
    next(error);
  }
}

// Your getEveryUser function remains unchanged
async function getEveryUser() {
  try {
    const userCred = await userCredentials.find(); // Assuming UserModel has a 'find' method
    console.log(userCred);
  } catch (error) {
    console.error('Error fetching user credentials:', error);
  }
}
