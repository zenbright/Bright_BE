import admin from "firebase-admin";
import {
  SERVICE_ACCOUNT,
} from "../../../../../config";

admin.initializeApp({
  credential: admin.credential.cert(SERVICE_ACCOUNT),
});

export async function sendPushNotification(fcmMessage: any) {
    admin
      .messaging()
      .send(fcmMessage.message)
      .then((response) => {
        console.log("Successfully sent message:", response);
      })
      .catch((error) => {
        console.error("Error sending message:", error);
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
        title: notificationTitle,
        body: notificationText,
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
