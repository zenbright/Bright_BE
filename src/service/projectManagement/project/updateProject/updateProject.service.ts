import Project from "../../../../models/groupProjectModel";
import { RESPONSE_CODE } from "../../../utils/constants";

export async function updateProjectService(req: any, res: any, next: any) {
  try {
    const { projectId, name, description } = req.body;

    const project = await Project.findOne({
      _id: projectId,
    });

    if (!project) {
      return res.status(404).json({ error: RESPONSE_CODE.NOT_FOUND_ERROR });
    }

    // Update the fields of the existing project
    project.name = name;
    project.description = description;

    // Save the updated project
    await project.save();

    await project.save();
    return res.status(200).json({ message: RESPONSE_CODE.SUCCESS });
  } catch (error) {
    next(error);
  }
}
