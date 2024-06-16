const amqp = require('amqplib');

// Defining channel
let channel;

// creating connection with RabbitMQ server
const connectRabbitMQ = async () => {
  try {
    const connection = await amqp.connect('amqp://localhost');
    channel = await connection.createChannel();
    console.log('RabbitMQ connected');
  } catch (error) {
    console.error('RabbitMQ connection error:', error);
    process.exit(1);
  }
};

const getChannel = () => channel;

module.exports = { connectRabbitMQ, getChannel };
