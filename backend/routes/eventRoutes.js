const express = require('express');
const router = express.Router();
const {
  createEvent,
  getAllEvents,
  getEventById,
  updateEvent,
  deleteEvent,
  registerForEvent,
  getOrganizedEvents,
  getJoinedEvents,
} = require('../controllers/eventController');
const { protect, organizer } = require('../middleware/authMiddleware');

router.get('/joined', protect, getJoinedEvents); // **Place /joined route BEFORE /:id**
router.get('/:id', getEventById); // Get event by ID (single event detail) - parameterized route
router.post('/', protect, organizer, createEvent);
router.get('/', getAllEvents);
router.put('/:id', protect, organizer, updateEvent);
router.delete('/:id', protect, organizer, deleteEvent);
router.post('/:id/register', protect, registerForEvent);
router.get('/organized', protect, organizer, getOrganizedEvents);


module.exports = router;