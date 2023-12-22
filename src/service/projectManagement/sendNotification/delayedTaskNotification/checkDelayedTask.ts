import Task from "../../../../models/taskModel";
import { checkDelayedTaskNotificationService } from "./notification.service";

export const checkDelayedTaskService = async () => {
  console.log("Checking delayed");
  // Find delayed tasks
  const tasks = await Task.find({
    dueDate: { $lte: new Date() },
    status: { $in: ["Incompleted", "On-going"] },
  });

  for (const task of tasks) {
    if (task.dueDate) {
      console.log("Delayed task name: " + task.name);
      await checkDelayedTaskNotificationService({ body: { task: task } });
    }
  };
};




