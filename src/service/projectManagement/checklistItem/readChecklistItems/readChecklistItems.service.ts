import TaskChecklistItem from "../../../../models/taskChecklistItemModel"; 
import { RESPONSE_CODE } from "../../../utils/constants";

export async function readChecklistsItemService(req: any, res: any, next: any) {
  try {
    const taskChecklistItems = await TaskChecklistItem.find();

    return res.status(200).json({ taskChecklistItems, message: RESPONSE_CODE.SUCCESS });
  } catch (error) {
    next(error);
  }
}
