import { EachMessagePayload } from 'kafkajs';
import { createConsumer } from '../consumerManager';
import { handleEmailRestaurantPayout } from '../../services/email.service';

export async function emailRestaurantPayoutConsumer() {
  const consumer = await createConsumer('mtogo-email-restaurant-payout');

  await consumer.subscribe({
    topic: 'notificationService_Payout_Restaurant',
    fromBeginning: false,
  });

  await consumer.run({
    eachMessage: async ({ topic, partition, message }: EachMessagePayload) => {
      console.log(topic, partition, message);

      const value = message.value?.toString();

      if (value) {
        const event = JSON.parse(value);

        console.log(
          `emailRestaurantPayoutConsumer received message from topic: ${topic}`,
          event,
        );
        await handleEmailRestaurantPayout(event);
      }
    },
  });

  return consumer;
}
