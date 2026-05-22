const express = require('express');
const router = express.Router();
const { getEvents, getAllEvents, createEvent, updateEvent, deleteEvent } = require('../controllers/eventController');
const { protect } = require('../middleware/auth');

router.get('/', getEvents);
router.get('/admin', protect, getAllEvents);
router.post('/', protect, createEvent);
router.put('/:id', protect, updateEvent);
router.delete('/:id', protect, deleteEvent);

module.exports = router;
