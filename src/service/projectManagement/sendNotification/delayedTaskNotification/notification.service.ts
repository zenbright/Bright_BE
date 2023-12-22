import userInfo from "../../../../models/userInfoModel";
import Group from "../../../../models/groupModel";
import Project from "../../../../models/projectModel";
import { RESPONSE_CODE } from "../../../utils/constants";
import { AUTH_EMAIL } from "../../../../config";
import { sendNotificationService } from "../sendNotification.service";

export async function checkDelayedTaskNotificationService(req: any) {
  try {
    const { task } = req.body;

    const project = await Project.findOne({ _id: task.projectId });
    if (!project) {
      return {
        success: false,
        status: 404,
        message: RESPONSE_CODE.NOT_FOUND_ERROR,
      };
    }
    const group = await Group.findOne({ groupId: project.groupId });

    if (!group) {
      return {
        success: false,
        status: 404,
        message: RESPONSE_CODE.NOT_FOUND_ERROR,
      };
    }

    const responses = [];

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

export function generateEmailContent(
  email: string | undefined,
  task: any,
  projectName: string,
) {
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
        We regret to inform you that your task, <strong>${task.name}</strong>, in project <strong>${projectName}</strong>, is currently delayed.
      </p>
  
      <p>
        The original due date for this task was <strong>${task.dueDate}</strong>.
      </p>
  
      <p>
        To ensure the success of your project, we recommend the following actions:
      </p>
  
      <ol>
        <li>Update the status of the task on the Bright website if it has been completed.</li>
        <li>If the task is still pending, kindly communicate with your team to discuss adjusting the due date or expediting the completion process.</li>
      </ol>
  
      <p>
        Effective communication within the team is crucial for the success of the project.
      </p>
  
      <p>
        If you have any concerns or require further assistance, please feel free to respond to this email or reach out to our support team.
      </p>
  
      <p>Best regards,</p>
      <p>Bright Team</p>
    </body>
  </html>
  `;

  return {
    from: AUTH_EMAIL,
    to: email,
    subject: "Task Delay Notification",
    html: emailContent,
  };
}
