import Task from "../../../../models/projectTaskModel";
import ChecklistItem from "../../../../models/taskChecklistItemModel";
import { RESPONSE_CODE } from "../../../utils/constants";

export async function createChecklistItemService(req: any, res: any, next: any) {
  try {
    const { taskId, name } = req.body;

    const task = await Task.findOne({
      _id: taskId,
    });

    if (!task) {
      return res.status(404).json({ error: RESPONSE_CODE.NOT_FOUND_ERROR });
    }

    const checklistItem = new ChecklistItem({
      name: name,
    });
    await checklistItem.save();

    task.checklist.push(checklistItem._id.toString());
    await task.save();

    return res.status(200).json({ message: RESPONSE_CODE.SUCCESS });
  } catch (error) {
    next(error);
  }
}
