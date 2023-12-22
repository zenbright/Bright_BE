import userInfo from "../../../../models/userInfoModel";
import Group from "../../../../models/groupModel";
import { RESPONSE_CODE } from "../../../utils/constants";
import { AUTH_EMAIL } from "../../../../config";
import { sendNotificationService } from "../sendNotification.service";

export async function notificationService(req: any) {
  try {
    const { task, project } = req.body;

    const group = await Group.findOne({ groupId: project.groupId });

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
        const mailInfo = generateEmailContent(user.email.address, task, project.name);

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

export function generateEmailContent(email: string | undefined, task: any, projectName: string) {
  if (!email) {
    console.error("Email address is missing for user");
    return null;
  }

  const emailContent = `
  <html>
    <head>
      <style>
        body {
          font-family: 'Arial', sans-serif;
          margin: 20px;
        }

        p {
          margin-bottom: 10px;
        }

        strong {
          color: #007bff;
        }
      </style>
    </head>
    <body>
      <p>Dear User,</p>

      <p>
        A new task, <strong>${task.name}</strong>, has been created for the month of <strong>${task.belongedMonth}</strong>.
      </p>

      <p>
        <strong>Task Description:</strong> ${task.description || "No description available"}
      </p>

      <p>
        <strong>Due Date:</strong> ${task.dueDate || "No due date"}
      </p>

      <p>
        Thank you for being part of this task.
      </p>

      <p>Best regards,</p>
      <p>Bright</p>
    </body>
  </html>
`;

  return {
    from: AUTH_EMAIL,
    to: email,
    subject: "New Task Notification",
    html: emailContent,
  };
}
