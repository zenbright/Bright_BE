import Task from "../../../../models/projectTaskModel";
import ChecklistItem from "../../../../models/taskChecklistItemModel";
import { RESPONSE_CODE } from "../../../utils/constants";
import redisClient from "../../../../service/utils/redisConfig";

export async function createChecklistItemService(
  req: any,
  res: any,
  next: any,
) {
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

    // Update cached data in Redis after saving the new checklist item
    const cachedData = await redisClient.get("checklistItems-" + taskId);
    if (cachedData) {
      const parsedData = JSON.parse(cachedData);
      parsedData.checklistItems.push(checklistItem);
      await redisClient.set(
        "checklistItems-" + taskId,
        JSON.stringify(parsedData),
      );
    }

    return res.status(200).json({ message: RESPONSE_CODE.SUCCESS });
  } catch (error) {
    next(error);
  }
}
