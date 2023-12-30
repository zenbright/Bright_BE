import Project from "../../../../models/groupProjectModel";
import Task from "../../../../models/projectTaskModel";
import { RESPONSE_CODE } from "../../../utils/constants";
import { deleteTaskService } from "../../task/deleteTask/deleteTask.service";

export async function deleteProjectService(req: any, res: any, next: any) {
  try {
    const { projectId } = req.body;

    const project = await Project.findOne({
      _id: projectId,
    });

    if (!project) {
      return res.status(404).json({ error: RESPONSE_CODE.NOT_FOUND_ERROR });
    }

    const tasks = await Task.find({ projectId: projectId });

    for (const task of tasks) {
      await deleteTaskService({ body: { taskId: task._id } }, res, next);
    }

    await Project.deleteOne({ _id: projectId });
    return res.status(200).json({
      message: RESPONSE_CODE.SUCCESS,
    });
  } catch (error) {
    next(error);
  }
}
