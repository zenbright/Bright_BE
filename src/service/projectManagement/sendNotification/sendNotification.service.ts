import { RESPONSE_CODE } from "../../utils/constants";
import nodemailer from "nodemailer";
import { AUTH_EMAIL, AUTH_PASSWORD } from "../../../config";

export async function sendNotificationService(req: any) {
  try {
    const { mailInfo } = req.body;

    await sendMail(mailInfo);

    // Resolve without sending a response here
    return Promise.resolve();
  } catch (error) {
    console.error(error);
    // Handle error and reject the promise
    return Promise.reject(error);
  }
}

export async function sendMail(mailInfo: any) {
  return new Promise<void>((resolve, reject) => {
    let transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: {
        user: AUTH_EMAIL,
        pass: AUTH_PASSWORD,
      },
    });

    transporter.sendMail(mailInfo, (error, info) => {
      if (error) {
        console.error(error);
        reject(error);
      } else {
        console.log("Email sent: " + info.response);
        resolve();
      }
    });
  });
}
