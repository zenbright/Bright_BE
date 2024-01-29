import { publishMessage } from "./pub-sub/publisher";
import { subscribeToQueue } from "./pub-sub/subscriber";
import { PUSH_NOTIFICATION_QUEUE } from "../../../config";
import { sendPushNotification } from "./sendPushNotification.service";

export async function setupPushNotificationSubscriber() {
  // requestPermission();
  await subscribeToQueue(
    PUSH_NOTIFICATION_QUEUE,
    (deviceToken, pushMessage) => {
      sendPushNotification(deviceToken, pushMessage);
    },
  );
}

export const pushNotificationPublisher = {
  publish: async (message: string, deviceToken: string) => {
    try {
      // Modify the format of the message to include the deviceToken
      const fullMessage = `${deviceToken}:${message}`;
      await publishMessage(fullMessage, PUSH_NOTIFICATION_QUEUE);
    } catch (error) {
      console.error(error);
      throw error;
    }
  },
};
