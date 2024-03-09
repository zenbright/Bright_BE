import Group from "../../../../models/groupModel";
import { RESPONSE_CODE } from "../../../utils/constants";

export async function getGroupsService(req: any, res: any) {
  try {
    const groups = await Group.find();

    return res.status(200).json({
      status: RESPONSE_CODE.SUCCESS,
      groups: groups,
    });
  } catch (error) {
    console.log(error);
  }
}
