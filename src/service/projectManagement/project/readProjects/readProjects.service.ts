import Project from "../../../../models/groupProjectModel";
import { RESPONSE_CODE } from "../../../utils/constants";

export async function readProjectsService(req: any, res: any, next: any) {
  try {
    const projects = await Project.find();

    return res.status(200).json({ projects, message: RESPONSE_CODE.SUCCESS });
  } catch (error) {
    next(error);
  }
}
