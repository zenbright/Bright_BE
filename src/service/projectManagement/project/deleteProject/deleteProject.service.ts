import Project from "../../../../models/groupProjectModel";
import { RESPONSE_CODE } from "../../../utils/constants";

export async function deleteProjectService(req: any, res: any, next: any) {
  try {
    const { projectId } = req.body;

    const project = await Project.findOne({
      _id: projectId,
    });

    if (!project) {
      return res.status(404).json({ error: RESPONSE_CODE.NOT_FOUND_ERROR });
    }

    await Project.deleteOne({ _id: projectId });
    return res.status(200).json({
      message: RESPONSE_CODE.SUCCESS,
    });
  } catch (error) {
    next(error);
  }
}
