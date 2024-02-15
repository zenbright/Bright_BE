import Task from "../../../../models/projectTaskModel";
import Project from "../../../../models/groupProjectModel";
import { RESPONSE_CODE } from "../../../utils/constants";
import redisClient from "../../../../service/utils/redisConfig";

export async function readTasksService(projectId: string, res: any, next: any) {
  try {
    // Check if data exists in Redis cache
    const cachedData = await redisClient.get("tasks-" + projectId);
    if (cachedData) {
      console.log("Cache Hit!", cachedData);
      const parsedData = JSON.parse(cachedData);
      return res.status(200).json(parsedData);
    }

    console.log("Cache Miss!");

    const project = await Project.findOne({
      _id: projectId,
    });

    if (!project) {
      return res.status(404).json({ message: RESPONSE_CODE.NOT_FOUND_ERROR });
    }

    const tasks = await Task.find();

    // Store fetched data in Redis cache
    await redisClient.set(
      "tasks-" + projectId,
      JSON.stringify({
        status: RESPONSE_CODE.SUCCESS,
        tasks: tasks,
      }),
    );

    return res.status(200).json({ tasks, message: RESPONSE_CODE.SUCCESS });
  } catch (error) {
    next(error);
  }
}
