import Group from "../../../../models/groupModel";
import { RESPONSE_CODE } from "../../../utils/constants";

export async function getGroupService(params: { groupId: string }, res: any) {
  try {
    const { groupId } = params;

    console.log(groupId);
    const group = await Group.findOne({ _id: groupId });

    return res.status(200).json({
      status: RESPONSE_CODE.SUCCESS,
      group: group,
    });
  } catch (error) {
    console.log(error);
  }
}
