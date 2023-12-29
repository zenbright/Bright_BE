import Task from "../../../../models/projectTaskModel";
import { RESPONSE_CODE } from "../../../utils/constants";

export async function deleteTaskService(req: any, res: any, next: any) {
  try {
    const { taskId } = req.body;

    const task = await Task.findOne({
      _id: taskId,
    });

    if (!task) {
      return res.status(404).json({ error: RESPONSE_CODE.NOT_FOUND_ERROR });
    }

    await task.deleteOne({ _id: taskId });
    return res.status(200).json({
      message: RESPONSE_CODE.SUCCESS,
    });
  } catch (error) {
    next(error);
  }
}
