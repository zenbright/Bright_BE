import TaskChecklistItem from "../../../../models/taskChecklistItemModel";
import { RESPONSE_CODE } from "../../../utils/constants";
import redisClient from "../../../../service/utils/redisConfig";

export async function readChecklistsItemService(
  taskId: string,
  res: any,
  next: any,
) {
  try {
    // Check if data exists in Redis cache
    const cachedData = await redisClient.get("checklistItems-" + taskId);
    if (cachedData) {
      console.log("Cache Hit!", cachedData);
      const parsedData = JSON.parse(cachedData);
      return res.status(200).json(parsedData);
    }

    console.log("Cache Miss!");

    const taskChecklistItems = await TaskChecklistItem.find();

    // Store fetched data in Redis cache
    await redisClient.set(
      "checklistItems-" + taskId,
      JSON.stringify({
        status: RESPONSE_CODE.SUCCESS,
        checklistItems: taskChecklistItems,
      }),
    );

    return res
      .status(200)
      .json({ taskChecklistItems, message: RESPONSE_CODE.SUCCESS });
  } catch (error) {
    next(error);
  }
}
