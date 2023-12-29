import Task from "../../../../models/projectTaskModel";
import { RESPONSE_CODE } from "../../../utils/constants";

export async function updateTaskService(req: any, res: any, next: any) {
  try {
    const {
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
    console.log("Updated task: ", task);
    return res.status(200).json({ message: RESPONSE_CODE.SUCCESS });
  } catch (error) {
    next(error);
  }
}
