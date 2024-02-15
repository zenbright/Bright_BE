import Task from "../../../../models/projectTaskModel";
import { RESPONSE_CODE } from "../../../utils/constants";

export async function readTasksService(req: any, res: any, next: any) {
  try {
    const tasks = await Task.find();

    return res.status(200).json({ tasks, message: RESPONSE_CODE.SUCCESS });
  } catch (error) {
    next(error);
  }
}
