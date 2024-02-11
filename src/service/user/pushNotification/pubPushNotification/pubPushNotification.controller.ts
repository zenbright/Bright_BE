// controller

import { pushNotificationPublisher } from './pubPushNotification.service';

export async function pushNotificationController(req: any, res: any, next: any) {
  try {
    const message = req.body.message;
    const title = req.body.title;
    const deviceToken = req.body.deviceToken; // Add this line

    if (!message || !deviceToken || !title) {
      return res.status(400).json({
        message: 'queueName, message, and deviceToken are required.',
      });
    }

    // Publish the message to RabbitMQ
    await pushNotificationPublisher.publish(title, message, deviceToken);

    return res.status(200).json({
      message: 'Notification sent successfully.',
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: 'Internal Server Error',
    });
  }
}
