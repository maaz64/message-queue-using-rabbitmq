const { getChannel } = require('../config/rabbitmq');
const Request = require('../models/requestModel');

// saving the incoming queue request in database and pushing it into the respected user queue using its id
exports.enqueueRequest = async (userId, requestData) => {

  // saving in database
  const request = new Request({ userId, data: requestData });
  await request.save();

  // pushing into the respected user queueu
  const queueName = `queue_${userId}`;
  let properties = { headers: {userId}, timestamp: Date.now() };
  const channel = getChannel();
  await channel.assertQueue(queueName, { durable: false });
  channel.sendToQueue(queueName, Buffer.from(JSON.stringify(requestData)),properties);
};
