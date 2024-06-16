const queueService = require('../services/queueService');
const startWorker = require('../worker/wroker');

exports.enqueueRequest = async (req, res) => {
  try {
    await queueService.enqueueRequest(req.userId, req.body);
    res.status(200).json({ message: 'Request enqueued' });
    startWorker(req.userId);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
