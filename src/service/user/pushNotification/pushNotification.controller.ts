import { pushNotificationPublisher } from './pushNotification.service';

export async function pushNotificationController(req: any, res: any, next: any) {
  try {
    const queueName = req.body.queueName;
    const message = req.body.message;

    if (!queueName || !message) {
      return res.status(400).json({
        message: 'Both queueName and message are required.',
      });
    }

    await pushNotificationPublisher.publish(queueName, message);
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
  