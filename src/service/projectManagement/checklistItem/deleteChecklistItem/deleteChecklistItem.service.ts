import ChecklistItem from "../../../../models/taskChecklistItemModel";
import Task from "../../../../models/projectTaskModel";
import { RESPONSE_CODE } from "../../../utils/constants";
import redisClient from "../../../../service/utils/redisConfig";

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

    // Update cached data in Redis after deleting the checklist item
    const cachedData = await redisClient.get("checklistItems-" + taskId);
    if (cachedData) {
      const parsedData = JSON.parse(cachedData);
      parsedData.checklistItems = parsedData.checklistItems.filter(
        (item: any) => item._id !== itemId,
      );
      await redisClient.set(
        "checklistItems-" + taskId,
        JSON.stringify(parsedData),
      );
    }

    task.checklist = task.checklist.filter(
      (checklistItemId) => checklistItemId !== itemId,
    );

    await task.save();

    return res.status(200).json({ message: RESPONSE_CODE.SUCCESS });
  } catch (error) {
    next(error);
  }
}
