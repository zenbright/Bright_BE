import { publishMessage } from './publisher';
import { subscribeToQueue } from './subscriber';

const pushNotificationQueue = 'push_notification_queue';

export function sendPushNotification(deviceToken: string, message: string) {
  // Implement logic to send push notification to the device
  console.log(`Sending push notification to ${deviceToken}: ${message}`);
}

export async function setupPushNotificationSubscriber() {
  await subscribeToQueue(pushNotificationQueue, (message) => {
    const [deviceToken, pushMessage] = message.split(':');
    sendPushNotification(deviceToken, pushMessage);
  });
}

export const pushNotificationPublisher = {
  publish: async (deviceToken: string, message: string) => {
    const fullMessage = `${deviceToken}:${message}`;
    await publishMessage(fullMessage, pushNotificationQueue);
  },
};
