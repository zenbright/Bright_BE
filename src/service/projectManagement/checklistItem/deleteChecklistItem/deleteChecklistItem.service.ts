import ChecklistItem from "../../../../models/checklistItemModel";
import Task from "../../../../models/taskModel";
import { RESPONSE_CODE } from "../../../utils/constants";

export async function deleteChecklistItemService(
  req: any,
  res: any,
  next: any,
) {
  try {
    const { taskId, itemId } = req.body;

    const task = await Task.findOne({
      _id: taskId,
    });

    if (!task) {
      return res.status(404).json({ error: RESPONSE_CODE.NOT_FOUND_ERROR });
    }

    const item = await ChecklistItem.findOne({
      _id: itemId,
    });

    if (!item) {
      return res.status(404).json({ error: RESPONSE_CODE.NOT_FOUND_ERROR });
    }

    await ChecklistItem.deleteOne({ _id: itemId });

    task.checklist = task.checklist.filter(
      (checklistItemId) => checklistItemId !== itemId,
    );

    await task.save();

    return res.status(200).json({ message: RESPONSE_CODE.SUCCESS });
  } catch (error) {
    next(error);
  }
}
