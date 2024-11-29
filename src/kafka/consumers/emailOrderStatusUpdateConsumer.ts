import { EachMessagePayload } from 'kafkajs';
import { createConsumer } from '../consumerManager';
import { handleEmailOrderStatusUpdate } from '../../services/email.service';

export async function emailOrderStatusUpdateConsumer() {
  const consumer = await createConsumer(
    'email-customer-order-status-update-notification-group',
  );

  await consumer.subscribe({
    topic: 'notificationService_OrderStatusUpdate',
    fromBeginning: false,
  });

  await consumer.run({
    eachMessage: async ({ topic, partition, message }: EachMessagePayload) => {
      console.log(topic, partition, message);

      const value = message.value?.toString();

      if (value) {
        const event = JSON.parse(value);

        console.log(
          `EmailConsumer received message from topic: ${topic}`,
          event,
        );
        await handleEmailOrderStatusUpdate(event);
      }
    },
  });

  return consumer;
}
