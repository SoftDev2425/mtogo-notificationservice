import { EachMessagePayload } from 'kafkajs';
import { createConsumer } from '../kafka/consumerManager';
import { handleEmailNotification } from '../services/email.service';

export async function emailConsumer() {
  const consumer = await createConsumer('email-notification-group');

  await consumer.subscribe({
    topic: 'emailNotification_orderCreated',
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
        await handleEmailNotification(event);
      }
    },
  });

  return consumer;
}
