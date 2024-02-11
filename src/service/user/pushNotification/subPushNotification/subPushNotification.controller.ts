import { setupPushNotificationSubscriber } from "../pubPushNotification/pubPushNotification.service";

export async function subController(
  req: any,
  res: any,
  next: any,
) {
  try {
    // Publish the message to RabbitMQ
    await setupPushNotificationSubscriber();

    return res.status(200).json({
      message: "Notification sent successfully.",
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Internal Server Error",
    });
  }
}
