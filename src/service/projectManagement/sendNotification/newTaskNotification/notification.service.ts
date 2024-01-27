import userInfo from "../../../../models/userInfoModel";
import Group from "../../../../models/groupModel";
import { RESPONSE_CODE } from "../../../utils/constants";
import { sendNotificationService } from "../sendNotification.service";
import { generateEmailContent } from "./generateEmailContent";

export async function notificationService(req: any) {
  try {
    const { task, project } = req.body;

    const group = await Group.findOne({ _id: project.groupId });

    if (!group) {
      return {
        success: false,
        status: 404,
        message: RESPONSE_CODE.NOT_FOUND_ERROR,
      };
    }

    const responses = [];

    // Iterate through each task member and collect responses
    for (const userId of group.users) {
      const user = await userInfo.findOne({ _id: userId });

      if (!user || !user.email) {
        responses.push({ status: 404, message: RESPONSE_CODE.USER_NOT_FOUND });
      } else if (!user.email.isVerified) {
        responses.push({ status: 403, error: RESPONSE_CODE.NOT_ALLOWED });
      } else {
        const mailInfo = generateEmailContent(
          user.email.address,
          task,
          project.name,
        );

        if (mailInfo == null) {
          responses.push({ status: 200, message: RESPONSE_CODE.SUCCESS });
        } else {
          responses.push(
            sendNotificationService({ body: { mailInfo: mailInfo } }),
          );
        }
      }
    }

    // Wait for all promises to resolve
    await Promise.all(responses);

    return { success: true };
  } catch (error) {
    console.error(error);
    return {
      success: false,
      status: 500,
      error: RESPONSE_CODE.INTERNAL_SERVER_ERROR,
    };
  }
}
