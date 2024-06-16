const express = require('express');
const requestController = require('../controllers/requestController');
const authMiddleware = require('../middlewares/authMiddleware');

const router = express.Router();

router.post('/enqueue', authMiddleware, requestController.enqueueRequest);

module.exports = router;
