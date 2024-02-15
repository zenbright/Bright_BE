import Project from "../../../../models/groupProjectModel";
import { RESPONSE_CODE } from "../../../utils/constants";
import redisClient from "../../../../service/utils/redisConfig";

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

    // Update cached data in Redis after editing the project
    const cachedData = await redisClient.get("projects");
    if (cachedData) {
      const parsedData = JSON.parse(cachedData);
      const editedProjectIndex = parsedData.projects.findIndex(
        (project: any) => project._id === projectId,
      );
      if (editedProjectIndex !== -1) {
        parsedData.projects[editedProjectIndex].name = name;
        parsedData.projects[editedProjectIndex].description = description;
        await redisClient.set("projects", JSON.stringify(parsedData));
      }
    }

    return res.status(200).json({ message: RESPONSE_CODE.SUCCESS });
  } catch (error) {
    next(error);
  }
}
