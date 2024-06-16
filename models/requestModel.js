const mongoose = require('mongoose');

const requestSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  data: { type: Object, required: true },
  status: { type: String, default: 'pending' },
});

module.exports = mongoose.model('Request', requestSchema);
