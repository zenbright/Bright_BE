import { pushNotificationPublisher } from './pushNotification.service';

export async function pushNotificationcontroller(req: any, res: any, next: any) {
  pushNotificationPublisher.publish('device123', 'Hello, this is a push notification!');
}
  