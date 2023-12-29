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
