import { EachMessagePayload } from 'kafkajs';
import { createConsumer } from '../consumerManager';
import { handleEmailDeliveryAssignment } from '../../services/email.service';

export async function emailDeliveryAgentAssignmentConsumer() {
  const consumer = await createConsumer(
    'mtogo-email-delivery-agent-assignment',
  );

  await consumer.subscribe({
    topic: 'notificationService_emailNotificationDeliveryAgent',
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
        await handleEmailDeliveryAssignment(event);
      }
    },
  });

  return consumer;
}
