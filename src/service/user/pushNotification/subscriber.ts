import { connectToRabbitMQ } from '../../../rabbitmqConnection';

export async function subscribeToQueue(queueName: string, callback: (message: string) => void) {
  const { connection, channel } = await connectToRabbitMQ();

  await channel.assertQueue(queueName, { durable: false });
  channel.consume(queueName, (msg) => {
    if (msg) {
      const message = msg.content.toString();
      callback(message);
    }
  }, { noAck: true });

  console.log(`[*] Waiting for messages from ${queueName}`);
}
