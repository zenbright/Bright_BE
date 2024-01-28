import { publishMessage } from './pub-sub/publisher';
import { subscribeToQueue } from './pub-sub/subscriber';

const pushNotificationQueue = 'push_notification_queue';

export function sendPushNotification(deviceToken: string, message: string) {
  // Implement logic to send push notification to the device
  // TODO: FMC
  console.log(`Sending push notification to ${deviceToken}: ${message}`);
}

export async function setupPushNotificationSubscriber() {
  await subscribeToQueue(pushNotificationQueue, (message) => {
    const [deviceToken, pushMessage] = message.split(':');
    sendPushNotification(deviceToken, pushMessage);
  });
}

export const pushNotificationPublisher = {
  publish: async (queueName: string, message: string) => {
    try {
      const fullMessage = `${queueName}:${message}`;
      await publishMessage(fullMessage, pushNotificationQueue);
    } catch (error) {
      console.error(error);
      throw error; // Re-throw the error to handle it in the calling function
    }
  },
};