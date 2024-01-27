import { connectToRabbitMQ } from '../../../rabbitmqConnection';

export async function publishMessage(message: string, queueName: string) {
  const { connection, channel } = await connectToRabbitMQ();
  
  await channel.assertQueue(queueName, { durable: false });
  channel.sendToQueue(queueName, Buffer.from(message));

  console.log(`[x] Sent '${message}' to ${queueName}`);

  setTimeout(async () => {
    await connection.close();
  }, 500);
}
