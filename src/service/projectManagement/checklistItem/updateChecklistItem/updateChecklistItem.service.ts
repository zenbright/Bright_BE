import ChecklistItem from "../../../../models/taskChecklistItemModel";
import Task from "../../../../models/projectTaskModel";
import { RESPONSE_CODE } from "../../../utils/constants";
import redisClient from "../../../../service/utils/redisConfig";

export async function updateChecklistItemService(
  req: any,
  res: any,
  next: any,
) {
  try {
    const { taskId, itemId, name, completed } = req.body;

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

    item.name = name;
    item.completed = completed;

    await item.save();

    // Update cached data in Redis after editing the checklist item
    const cachedData = await redisClient.get("checklistItems-" + taskId);
    if (cachedData) {
      const parsedData = JSON.parse(cachedData);
      const editedItemIndex = parsedData.checklistItems.findIndex(
        (item: any) => item._id === itemId,
      );
      if (editedItemIndex !== -1) {
        parsedData.checklistItems[editedItemIndex].name = name;
        parsedData.checklistItems[editedItemIndex].completed = completed;

        await redisClient.set(
          "checklistItems-" + taskId,
          JSON.stringify(parsedData),
        );
      }
    }

    return res.status(200).json({ message: RESPONSE_CODE.SUCCESS });
  } catch (error) {
    next(error);
  }
}
