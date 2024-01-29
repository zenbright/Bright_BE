import { initializeApp } from "firebase/app";
import { getMessaging, getToken } from "firebase/messaging";
import { PUSH_NOTIFICATION_QUEUE, FIREBASE_CONFIG } from "../../../config";

// Initialize Firebase
// const app = initializeApp(FIREBASE_CONFIG);
// const messaging = getMessaging(app);
// getToken(messaging, {
//   vapidKey:
//     "BNBE25IQ-JdSZOCB7RR-Sj3Kom65jCG-_ac4rMjxtMSpEAXs6Uu0UqCkuYS8CCao3F2-LbAfgcXYjGdJGT1_YpM",
// })
//   .then((currentToken) => {
//     if (currentToken) {
//       console.log("currentToken: ", currentToken);
//     } else {
//       console.log(
//         "No registration token available. Request permission to generate one.",
//       );
//     }
//   })
//   .catch((err) => {
//     console.log("An error occurred while retrieving token. ", err);
//     // ...
//   });

// function requestPermission() {
//   console.log("Requesting permission...");
//   Notification.requestPermission().then((permission) => {
//     if (permission === "granted") {
//       console.log("Notification permission granted.");
//     } else {
//       console.log("Do not have permission!");
//     }
//   });
// }


export async function sendPushNotification(
  deviceToken: string,
  message: string,
) {
  try {
    const notification = {
      data: {
        title: "Your Notification Title",
        options: {
          body: message,
        },
      },
      token: deviceToken,
    };
    // TODO: Use the FCM SDK to send notifications
    console.log(`Sending push notification to ${deviceToken}: ${message}`);
  } catch (error) {
    console.error("Error sending FCM notification:", error);
  }
}