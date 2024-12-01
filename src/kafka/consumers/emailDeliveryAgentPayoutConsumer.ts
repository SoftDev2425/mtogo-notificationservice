import { EachMessagePayload } from 'kafkajs';
import { createConsumer } from '../consumerManager';
import { handleEmailDeliveryAgentPayout } from '../../services/email.service';

export async function emailDeliveryAgentPayoutConsumer() {
  const consumer = await createConsumer('mtogo-email-deliveryagent-payout');

  await consumer.subscribe({
    topic: 'notificationService_Payout_DeliveryAgent',
    fromBeginning: false,
  });

  await consumer.run({
    eachMessage: async ({ topic, partition, message }: EachMessagePayload) => {
      console.log(topic, partition, message);

      const value = message.value?.toString();

      if (value) {
        const event = JSON.parse(value);

        console.log(
          `emailDeliveryAgentPayoutConsumer received message from topic: ${topic}`,
          event,
        );
        await handleEmailDeliveryAgentPayout(event);
      }
    },
  });

  return consumer;
}
