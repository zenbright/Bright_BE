import Task from "../../../../models/taskModel";
import { taskReminderNotificationService } from "./notification.service";

// Service to remind about upcoming tasks within the next 24 hours
export const remindTaskService = async () => {
    console.log("Reminding tasks");
  
    // Calculate the time 24 hours from now
    const upcomingHour = new Date();
    upcomingHour.setHours(upcomingHour.getHours() + 24);
  
    // Retrieve tasks with due dates within the next 24 hours and are not completed
    const tasks = await Task.find({
      dueDate: { $gte: new Date(), $lt: upcomingHour },
      status: { $in: ["Incompleted", "On-going"] },
    });
  
    for (const task of tasks) {
      if (task.dueDate) {
        console.log("Task to remind's name: " + task.name);
        await taskReminderNotificationService({ body: { task: task } });
      }
    };
  };