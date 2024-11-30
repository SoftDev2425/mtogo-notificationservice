import { EachMessagePayload } from 'kafkajs';
import { createConsumer } from '../consumerManager';
import { handleEmailCustomerConfirmation } from '../../services/email.service';

export async function emailCustomerConfirmationConsumer() {
  const consumer = await createConsumer('mtogo-email-customer-confirmation');

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
        await handleEmailCustomerConfirmation(event);
      }
    },
  });

  return consumer;
}
