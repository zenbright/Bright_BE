import { AUTH_EMAIL } from "../../../../config";

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
          This is a friendly reminder about your upcoming task, <strong>${task.name}</strong>, in project <strong>${projectName}</strong>.
        </p>
    
        <p>
          The task is due within the next 24 hours, with the deadline set for <strong>${task.dueDate}</strong>.
        </p>
    
        <p>
          To ensure a successful and timely completion, please consider the following:
        </p>
    
        <ol>
          <li>Review the status of the task on the Bright website and update it if completed.</li>
          <li>If the task is still pending, coordinate with your team to address any potential obstacles and ensure a smooth completion process.</li>
        </ol>
    
        <p>
          Effective communication within the team is vital, especially as the deadline approaches.
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
  