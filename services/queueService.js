const { getChannel } = require('../config/rabbitmq');
const Request = require('../models/requestModel');

exports.enqueueRequest = async (userId, requestData) => {
  const request = new Request({ userId, data: requestData });
  await request.save();

  const queueName = `queue_${userId}`;
  const channel = getChannel();
  await channel.assertQueue(queueName, { durable: false });
  channel.sendToQueue(queueName, Buffer.from(JSON.stringify(requestData)));
};
