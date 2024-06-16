const express = require('express');
require('dotenv').config();
const { connectRabbitMQ } = require('./config/rabbitmq');

const authRoutes = require('./routes/authRoutes');
const requestRoutes = require('./routes/requestRoutes');

const app = express();

app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/request', requestRoutes);

try {
    await connectRabbitMQ();    
} catch (error) {
    console.log("Something went wrong while connecting to RabbitMQ server", error)
}

module.exports = app;
