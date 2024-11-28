import { emailDeliveryAgentAssignmentConsumer } from '../consumers/emailDeliveryAgentAssignmentConsumer';
import { emailCustomerConfirmationConsumer } from '../consumers/emailCustomerConfirmationConsumer';
import { shutdownConsumers } from './consumerManager';

const consumers: { disconnect: () => Promise<void> }[] = [];

async function startConsumers() {
  console.log('Starting Kafka consumers...');

  consumers.push(await emailCustomerConfirmationConsumer());
  consumers.push(await emailDeliveryAgentAssignmentConsumer());

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