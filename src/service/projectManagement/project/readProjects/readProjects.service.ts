import Project from "../../../../models/groupProjectModel";
import { RESPONSE_CODE } from "../../../utils/constants";
import redisClient from "../../../../service/utils/redisConfig";

export async function readProjectsService(req: any, res: any, next: any) {
  try {
    // Check if data exists in Redis cache
    const cachedData = await redisClient.get("projects");
    if (cachedData) {
      console.log("Cache Hit!", cachedData);
      const parsedData = JSON.parse(cachedData);
      return res.status(200).json(parsedData);
    }

    console.log("Cache Miss!");

    const projects = await Project.find();

    // Store fetched data in Redis cache
    await redisClient.set(
      "projects",
      JSON.stringify({
        status: RESPONSE_CODE.SUCCESS,
        projects: projects,
      }),
    );

    return res.status(200).json({ projects, message: RESPONSE_CODE.SUCCESS });
  } catch (error) {
    next(error);
  }
}
