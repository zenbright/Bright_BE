import * as amqp from "amqplib";

export async function connectToRabbitMQ() {
  try {
    console.log(`⌛️ Connecting to RabbitMQ Server`);
    const connection = await amqp.connect("amqp://localhost:5672",  { protocol: 'amqp0-9-1' });
    console.log(`✅ RabbitMQ Connection is ready`);
    const channel = await connection.createChannel();
    console.log(`🛸 Created RabbitMQ Channel successfully`);
    return { connection, channel };
  } catch (error) {
    console.error(error);
    console.error(`❌ Not connected to RabbitMQ Server`);
    throw error; // Re-throw the error to propagate it further if needed
  }
}
