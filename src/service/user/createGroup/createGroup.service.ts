import mongoose from "mongoose";
import userCredentials from "../../../models/userCredentials";
import Group from "src/models/group";
import { ERROR_CODE, SUCCESS_MESSAGE } from "../../utils/constants";

export async function createGroupService(req: any, res: any, next: any) {
  try {
    const { userCredId, invitedUsers } = req.body;

    const userCred = await userCredentials.findOne({
      userId: userCredId,
    });

    if (!userCred) {
      return res.status(404).json({ error: ERROR_CODE.USER_NOT_FOUND });
    } else {
        // check if every invited user exists
      for (const invitedUser of invitedUsers) {
        const invitedUserCred = await userCredentials.findOne({
          userId: invitedUser.userId,
        });

        if (!invitedUserCred) {
          return res.status(404).json({
            message: ERROR_CODE.USER_NOT_FOUND,
          });
        }
      }

      // After checking every user exists, create a new group
      const groupMembers = [...invitedUsers, userCredId];

      const newGroup = new Group({
        groupId: new mongoose.Types.ObjectId(),
        users: groupMembers,
      });
    
      await newGroup.save();
      return res.status(200).json({message: SUCCESS_MESSAGE});
    }
  } catch (error) {
    next(error);
  }
}


