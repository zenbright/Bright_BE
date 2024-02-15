import Task from "../../../../models/projectTaskModel";
import { RESPONSE_CODE } from "../../../utils/constants";
import redisClient from "../../../../service/utils/redisConfig";

export async function updateTaskService(req: any, res: any, next: any) {
  try {
    const {
      projectId,
      taskId,
      name,
      description,
      status,
      checklist,
      assignedMembers,
      dueDate,
      belongedMonth,
    } = req.body;

    const task = await Task.findOne({
      _id: taskId,
    });

    if (!task) {
      return res.status(404).json({ error: RESPONSE_CODE.NOT_FOUND_ERROR });
    }

    console.log("task: " + task);

    // Update the fields of the existing Task
    task.name = name;
    task.description = description;
    task.status = status;
    task.checklist = checklist;
    task.assignedMembers = assignedMembers;
    task.dueDate = dueDate;
    task.belongedMonth = belongedMonth;

    // Save the updated Task
    await task.save();
    // console.log("Updated task: ", task);

    // Update cached data in Redis after editing the task
    const cachedData = await redisClient.get("tasks-" + projectId);
    if (cachedData) {
      const parsedData = JSON.parse(cachedData);
      const editedTaskIndex = parsedData.tasks.findIndex(
        (task: any) => task._id === taskId,
      );
      if (editedTaskIndex !== -1) {
        parsedData.tasks[editedTaskIndex].name = name;
        parsedData.tasks[editedTaskIndex].status = status;
        parsedData.tasks[editedTaskIndex].checklist = checklist;
        parsedData.tasks[editedTaskIndex].assignedMembers = assignedMembers;
        parsedData.tasks[editedTaskIndex].dueDate = dueDate;
        parsedData.tasks[editedTaskIndex].belongedMonth = belongedMonth;

        await redisClient.set("tasks-" + projectId, JSON.stringify(parsedData));
      }
    }

    return res.status(200).json({ message: RESPONSE_CODE.SUCCESS });
  } catch (error) {
    next(error);
  }
}
