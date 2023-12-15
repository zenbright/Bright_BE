import Group from "../../../../models/groupModel";
import Project from "../../../../models/projectModel";
import { RESPONSE_CODE } from "../../../utils/constants";

export async function createProjectService(req: any, res: any, next: any) {
  try {
    const { name, description, groupId } = req.body;

    const group = await Group.findOne({
      groupId: groupId,
    });

    if (!group) {
      return res.status(404).json({ error: RESPONSE_CODE.NOT_FOUND_ERROR });
    }

    const project = new Project({
      name: name,
      description: description,
      groupId: groupId,
    });

    await project.save();
    return res.status(200).json({ message: RESPONSE_CODE.SUCCESS });
  } catch (error) {
    next(error);
  }
}
