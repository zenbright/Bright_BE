import { connectToRabbitMQ } from "../../../rabbitmqConnection";
import { RESPONSE_CODE } from "../../utils/constants";

export async function publishMessage(
  message: string,
  queueName: string,
) {
  try {
    const { connection, channel } = await connectToRabbitMQ();

    // await channel.assertQueue(queueName, { durable: false });
    channel.sendToQueue(queueName, Buffer.from(message));
    console.log(`[x] Sent '${message}' to ${queueName}`);
  } catch (error) {
    console.error(error);
    throw error; // Re-throw the error to handle it in the calling function
  }
}
