import { AUTH_EMAIL } from "../../../../config";

export function generateEmailContent(email: string | undefined, project: any) {
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
          A new project, <strong>${project.name}</strong>, has been created.
        </p>
  
        <p>
          <strong>Project Description:</strong> ${project.description || "No description available"}
        </p>
  
        <p>
          Thank you for being part of this project.
        </p>
  
        <p>Best regards,</p>
        <p>Bright</p>
      </body>
    </html>
  `;
  
    return {
      from: AUTH_EMAIL,
      to: email,
      subject: "New Project Notification",
      html: emailContent,
    };
  }
  