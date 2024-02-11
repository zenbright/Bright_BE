import admin from "firebase-admin";
import { google } from "googleapis";
import {
  GOOGLE_APPLICATION_CREDENTIALS,
  SERVICE_ACCOUNT,
  HOST,
  PATH,
  SCOPES,
} from "../../../../../config";

admin.initializeApp({
  credential: admin.credential.cert(SERVICE_ACCOUNT),
});

function getAccessToken() {
  return new Promise(function (resolve, reject) {
    const jwtClient = new google.auth.JWT(
      GOOGLE_APPLICATION_CREDENTIALS.client_email,
      "",
      GOOGLE_APPLICATION_CREDENTIALS.private_key,
      SCOPES,
      "",
    );
    jwtClient.authorize(function (err: any, tokens: any) {
      if (err) {
        reject(err);
        return;
      }
      resolve(tokens.access_token);
    });
  });
}

export async function sendPushNotification(fcmMessage: any) {
  getAccessToken().then(function (accessToken) {
    const options = {
      hostname: HOST,
      path: PATH,
      method: "POST",
      headers: {
        Authorization: "Bearer " + accessToken,
      },
    };

    admin
      .messaging()
      .send(fcmMessage.message)
      .then((response) => {
        console.log("Successfully sent message:", response);
      })
      .catch((error) => {
        console.error("Error sending message:", error);
      });
  });
}

/**
 * Construct a JSON object that will be used to customize
 * the messages sent to iOS and Android devices.
 */
export function buildOverrideMessage(
  deviceToken: string,
  notificationTitle: string,
  notificationText: string,
) {
  return {
    message: {
      token: deviceToken,
      notification: {
        title: notificationTitle,
        body: notificationText,
      },
      data: {
        // story_id: "story_12345",
      },
      android: {
        notification: {
          click_action: "android.intent.action.MAIN",
        },
      },
      apns: {
        payload: {
          aps: {
            badge: 1,
          },
        },
        headers: {
          "apns-priority": "10",
        },
      },
      webpush: {
        fcm_options: {
          link: "https://bright.com",
        },
      },
    },
  };
}
