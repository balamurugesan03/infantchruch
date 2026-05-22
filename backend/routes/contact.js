const express = require('express');
const router = express.Router();
const { sendMessage, getMessages, markAsRead, deleteMessage } = require('../controllers/contactController');
const { protect } = require('../middleware/auth');

router.post('/', sendMessage);
router.get('/', protect, getMessages);
router.patch('/:id/read', protect, markAsRead);
router.delete('/:id', protect, deleteMessage);

module.exports = router;
