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
          A new task, <strong>${
            task.name
          }</strong>, has been created for the month of <strong>${
            task.belongedMonth
          }</strong>.
        </p>
  
        <p>
          <strong>Task Description:</strong> ${
            task.description || "No description available"
          }
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
