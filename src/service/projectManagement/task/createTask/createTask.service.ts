import Group from "../../../../models/groupModel";
import Project from "../../../../models/groupProjectModel";
import Task from "../../../../models/projectTaskModel";
import { RESPONSE_CODE } from "../../../utils/constants";
import { notificationService } from "../../sendNotification/newTaskNotification/notification.service";

export async function createTaskService(req: any, res: any, next: any) {
  try {
    const {
      projectId,
      name,
      description,
      assignedMembers,
      dueDate,
      belongedMonth,
    } = req.body;

    const tasks = await Task.find();
    console.log("tasks", tasks);

    const project = await Project.findOne({
      _id: projectId,
    });

    if (!project) {
      return res.status(404).json({ message: RESPONSE_CODE.NOT_FOUND_ERROR });
    }

    if (dueDate && !isValidDate(dueDate)) {
      return res.status(400).json({ message: RESPONSE_CODE.INVALID_VALUE });
    }

    if (!isValidMonthYearFormat(belongedMonth)) {
      return res.status(400).json({ message: RESPONSE_CODE.INVALID_VALUE });
    }

    if (!isValidMembers(assignedMembers, project.groupId)) {
      return res.status(400).json({ message: RESPONSE_CODE.INVALID_VALUE });
    }

    const task = new Task({
      projectId: projectId,
      name: name,
      description: description,
      assignedMembers: assignedMembers || [],
      dueDate: dueDate || null,
      belongedMonth: belongedMonth,
    });

    await task.save();

    const notificationResult = await notificationService({
      body: { task: task, project: project },
    });

    if (notificationResult.success) {
      return res.status(200).json({ message: RESPONSE_CODE.SUCCESS });
    } else {
      return res
        .status(notificationResult.status)
        .json(notificationResult.error);
    }
  } catch (error) {
    next(error);
  }
}

// Helper function to validate date format
function isValidDate(dateString: string): boolean {
  return !isNaN(Date.parse(dateString));
}

// Helper function to validate month-year format (Jan-2024)
function isValidMonthYearFormat(monthYearString: string): boolean {
  const regex = /^[A-Za-z]{3}-\d{4}$/;
  return regex.test(monthYearString);
}

async function isValidMembers(
  assignedMembers: string[],
  groupId: string,
): Promise<boolean> {
  try {
    const group = await Group.findOne({ _id: groupId });

    if (!group) {
      return false;
    }

    const isValid = assignedMembers.every((memberId) =>
      group.users.includes(memberId),
    );

    return isValid;
  } catch (error) {
    console.error("Error in isValidMembers:", error);
    return false;
  }
}
