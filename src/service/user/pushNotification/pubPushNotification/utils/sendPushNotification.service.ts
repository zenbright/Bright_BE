import admin from "firebase-admin";
import { google } from "googleapis";
import https from "https";
import { GOOGLE_APPLICATION_CREDENTIALS, HOST, PATH, SCOPES } from "../../../../../config";

admin.initializeApp({
  credential: admin.credential.applicationDefault(),
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

export async function sendPushNotification(
  deviceToken: string,
  fcmMessage: any,
) {
  getAccessToken().then(function (accessToken) {
    const options = {
      hostname: HOST,
      path: PATH,
      method: "POST",
      // [START use_access_token]
      headers: {
        Authorization: "Bearer " + accessToken,
      },
      // [END use_access_token]
    };

    const request = https.request(options, function (resp) {
      resp.setEncoding("utf8");
      resp.on("data", function (data) {
        console.log("Message sent to Firebase for delivery, response:");
        console.log(data);
      });
    });

    request.on("error", function (err) {
      console.log("Unable to send message to Firebase");
      console.log(err);
    });

    request.write(JSON.stringify(fcmMessage));
    request.end();
  });
}

/**
 * Construct a JSON object that will be used to customize
 * the messages sent to iOS and Android devices.
 */
export function buildOverrideMessage(pushMessage: string) {
  return {
    message: {
      topic: "news",
      notification: {
        title: "Breaking News",
        body: pushMessage,
      },
      data: {
        story_id: "story_12345",
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
    },
  };
}
