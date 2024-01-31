/* 
https://firebase.google.com/docs/cloud-messaging/js/send-multiple
*/

import { initializeApp } from "firebase/app";
import { getMessaging, getToken } from "firebase/messaging";
import { FIREBASE_CONFIG, VAPIDKEY } from "../../../../config";

// Initialize Firebase Admin SDK
const app = initializeApp(FIREBASE_CONFIG);

// // Get a reference to the messaging service
const messaging = getMessaging(app);

export async function getDeviceToken() {
    console.log("GettingToken");
   try {
     console.log("GettingToken");
     const currentToken = await getToken(messaging, {
       vapidKey: VAPIDKEY,
     });

     if (currentToken) {
       console.log("Registration token:", currentToken);
       fetch(`http://localhost:4000/saveDeviceToken`, {
         method: "POST",
         headers: {
           "Content-Type": "application/json",
         },
         body: JSON.stringify({ deviceToken: currentToken }),
       });
     } else {
       console.log("No registration token available.");
       requestPermission();
     }
   } catch (err) {
     console.error("Error retrieving registration token:", err);
     throw err; // Propagate the error if needed
   }
}

function requestPermission() {
  console.log("Requesting permission...");
  Notification.requestPermission().then((permission) => {
    if (permission === "granted") {
      console.log("Notification permission granted.");
    } else {
      console.log("Notification permission is NOT granted.");
    }
  });
}


