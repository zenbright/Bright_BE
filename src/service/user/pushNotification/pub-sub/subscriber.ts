import { connectToRabbitMQ } from "../../../../rabbitmqConnection";

export async function subscribeToQueue(
  queueName: string,
  callback: (deviceToken: string, message: string) => void,
) {
  const { connection, channel } = await connectToRabbitMQ();

  // await channel.assertQueue(queueName, { durable: false });
  channel.consume(
    queueName,
    (msg) => {
      if (msg) {
        const [deviceToken, pushMessage] = msg.content.toString().split(":");
        callback(deviceToken, pushMessage);
      }
    },
    { noAck: true },
  );

  console.log(`[*] Waiting for messages from ${queueName}`);
}
