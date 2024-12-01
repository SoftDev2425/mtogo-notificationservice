import { emailDeliveryAgentAssignmentConsumer } from './consumers/emailDeliveryAgentAssignmentConsumer';
import { emailCustomerConfirmationConsumer } from './consumers/emailCustomerConfirmationConsumer';
import { shutdownConsumers } from './consumerManager';
import { emailOrderStatusUpdateConsumer } from './consumers/emailOrderStatusUpdateConsumer';
import { emailRestaurantPayoutConsumer } from './consumers/emailRestaurantPayoutConsumer';
import { emailDeliveryAgentPayoutConsumer } from './consumers/emailDeliveryAgentPayoutConsumer';

const consumers: { disconnect: () => Promise<void> }[] = [];

async function startConsumers() {
  console.log('Starting Kafka consumers...');

  consumers.push(await emailCustomerConfirmationConsumer());
  consumers.push(await emailDeliveryAgentAssignmentConsumer());
  consumers.push(await emailOrderStatusUpdateConsumer());
  consumers.push(await emailRestaurantPayoutConsumer());
  consumers.push(await emailDeliveryAgentPayoutConsumer());

  console.log('All consumers started successfully');
}

async function shutdownAll() {
  console.log('Shutting down all consumers...');
  await shutdownConsumers(consumers);
  process.exit(0);
}

process.on('SIGINT', shutdownAll);
process.on('SIGTERM', shutdownAll);

export default startConsumers;
