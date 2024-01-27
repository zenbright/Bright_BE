import Group from "../../../../models/groupModel";
import Project from "../../../../models/groupProjectModel";
import { RESPONSE_CODE } from "../../../utils/constants";
import { notificationService } from "../../sendNotification/newProjectNotification/notification.service";

export async function createProjectService(req: any, res: any, next: any) {
  try {
    const { name, description, groupId } = req.body;

    const group = await Group.findOne({
      _id: groupId,
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

    const notificationResult = await notificationService({
      body: { project: project },
    });

    if (notificationResult.success) {
      return res.status(200).json({ message: RESPONSE_CODE.SUCCESS });
    } else {
      return res
        .status(notificationResult.status)
        .json(notificationResult.error);
    }
  } catch (error) {
    console.error(error);
    next(error);
  }
}
