import Group from "../../../../models/groupModel";
import { RESPONSE_CODE } from "../../../utils/constants";
import { notificationService } from "../../sendNotification/createdProjectNotification/notification.service";

export async function createProjectService(req: any, res: any, next: any) {
  try {
    const { name, description, groupId } = req.body;

    const group = await Group.findOne({
      groupId: groupId,
    });

    if (!group) {
      return res.status(404).json({ error: RESPONSE_CODE.NOT_FOUND_ERROR });
    }

    const project = {
      name: name,
      description: description,
      groupId: groupId,
    };

    const notificationResult = await notificationService({
      body: { project: project },
    });

    if (notificationResult.success) {
      // Send the success response for project creation
      return res.status(200).json({ message: RESPONSE_CODE.SUCCESS });
    } else {
      // Handle error and send an appropriate response
      return res
        .status(notificationResult.status)
        .json(notificationResult.error);
    }
  } catch (error) {
    // Handle errors properly
    console.error(error);
    next(error);
  }
}
