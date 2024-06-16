const { getChannel } = require('../config/rabbitmq');

// Start consuming the request based on userId
const startWorker = async () => {
  const channel = getChannel();
  const queueName = `queue_${userId}`;
  await channel.assertQueue(queueName, { durable: false });

  channel.consume(queueName, async (msg) => {
    if (msg !== null) {
      const task = JSON.parse(msg.content.toString());
      console.log(`Processing task: ${task}`);
      channel.ack(msg);
    }
  });
};

module.exports = startWorker;
