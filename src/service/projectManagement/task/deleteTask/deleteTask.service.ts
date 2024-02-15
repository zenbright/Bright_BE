import Task from "../../../../models/projectTaskModel";
import Project from "../../../../models/groupProjectModel";
import { RESPONSE_CODE } from "../../../utils/constants";
import { deleteChecklistItemService } from "../../checklistItem/deleteChecklistItem/deleteChecklistItem.service";
import redisClient from "../../../../service/utils/redisConfig";

export async function deleteTaskService(req: any, res: any, next: any) {
  try {
    const { projectId, taskId } = req.body;

    const project = await Project.findOne({
      _id: projectId,
    });

    if (!project) {
      return res.status(404).json({ error: RESPONSE_CODE.NOT_FOUND_ERROR });
    }

    const task = await Task.findOne({
      _id: taskId,
    });

    if (!task) {
      return res.status(404).json({ error: RESPONSE_CODE.NOT_FOUND_ERROR });
    }

    for (const itemId of task.checklist) {
      await deleteChecklistItemService({ body: { taskId, itemId } }, res, next);
    }

    // Update cached data in Redis after deleting the task
    const cachedData = await redisClient.get("tasks-" + projectId);
    if (cachedData) {
      const parsedData = JSON.parse(cachedData);
      parsedData.tasks = parsedData.tasks.filter(
        (task: any) => task._id !== taskId,
      );
      await redisClient.set("tasks-" + projectId, JSON.stringify(parsedData));
    }

    await task.deleteOne({ _id: taskId });
    return res.status(200).json({
      message: RESPONSE_CODE.SUCCESS,
    });
  } catch (error) {
    next(error);
  }
}
