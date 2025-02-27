const Event = require('../models/Event');
const User = require('../models/User');

// @desc    Create a new event
// @route   POST /api/events
// @access  Private (Organizer role)
const createEvent = async (req, res) => {
  const { title, description, date, location, capacity, thumbnail } = req.body; // **Extract thumbnail from req.body**

  try {
    const event = new Event({
      title,
      description,
      date,
      location,
      capacity,
      thumbnail, // **Include thumbnail in event creation**
      organizer: req.user._id, // Logged-in user is the organizer
    });

    const createdEvent = await event.save();

    // Update organizer's eventsOrganized array
    const organizer = await User.findById(req.user._id);
    organizer.eventsOrganized.push(createdEvent._id);
    await organizer.save();

    res.status(201).json(createdEvent);
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};

// @desc    Get all events (public listing)
// @route   GET /api/events
// @access  Public
const getAllEvents = async (req, res) => {
  try {
    const events = await Event.find().populate('organizer', 'name email'); // Populate organizer details
    res.json(events);
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};

// @desc    Get event by ID
// @route   GET /api/events/:id
// @access  Public
const getEventById = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id).populate('organizer', 'name email').populate('participants', 'name email');
    if (event) {
      res.json(event);
    } else {
      res.status(404).json({ message: 'Event not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};

// @desc    Update an event
// @route   PUT /api/events/:id
// @access  Private (Organizer of the event)
const updateEvent = async (req, res) => {
  const { title, description, date, location, capacity, thumbnail } = req.body; // **Extract thumbnail from req.body**

  try {
    const event = await Event.findById(req.params.id);

    if (event) {
      if (event.organizer.toString() !== req.user._id.toString()) {
        return res.status(401).json({ message: 'Not authorized to update this event' });
      }

      event.title = title || event.title;
      event.description = description || event.description;
      event.date = date || event.date;
      event.location = location || event.location;
      event.capacity = capacity === undefined ? event.capacity : capacity;
      event.thumbnail = thumbnail || event.thumbnail; // **Update thumbnail if provided**

      const updatedEvent = await event.save();
      res.json(updatedEvent);
    } else {
      res.status(404).json({ message: 'Event not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};


// @desc    Delete an event
// @route   DELETE /api/events/:id
// @access  Private (Organizer of the event)
const deleteEvent = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);

    if (event) {
      if (event.organizer.toString() !== req.user._id.toString()) {
        return res.status(401).json({ message: 'Not authorized to delete this event' });
      }

      // Remove event from organizer's eventsOrganized array
      await User.findByIdAndUpdate(req.user._id, { $pull: { eventsOrganized: event._id } });
      // Remove event from participants' eventsJoined arrays (if any) - you might need to iterate over participants and update their arrays if needed for full cleanup.

      await event.remove();
      res.json({ message: 'Event removed' });
    } else {
      res.status(404).json({ message: 'Event not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};

// @desc    Register/Join an event
// @route   POST /api/events/:id/register
// @access  Private (Participant role)
const registerForEvent = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    const user = await User.findById(req.user._id);

    if (!event) {
      return res.status(404).json({ message: 'Event not found' });
    }

    if (event.participants.includes(req.user._id)) {
      return res.status(400).json({ message: 'Already registered for this event' });
    }

    if (event.capacity > 0 && event.participants.length >= event.capacity) {
      return res.status(400).json({ message: 'Event capacity reached' });
    }

    event.participants.push(req.user._id);
    await event.save();

    user.eventsJoined.push(event._id);
    await user.save();

    res.json({ message: 'Registered for event successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};

// @desc    Get events organized by logged-in organizer
// @route   GET /api/events/organized
// @access  Private (Organizer role)
const getOrganizedEvents = async (req, res) => {
  try {
    const events = await Event.find({ organizer: req.user._id }).populate('participants', 'name email');
    res.json(events);
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};

// @desc    Get events joined by logged-in participant
// @route   GET /api/events/joined
// @access  Private (Participant role)
const getJoinedEvents = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).populate('eventsJoined').populate({
      path: 'eventsJoined',
      populate: { path: 'organizer', select: 'name email' } // Populate organizer within joined events
    });
    res.json(user.eventsJoined);
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};

module.exports = {
    createEvent,
    getAllEvents,
    getEventById,
    updateEvent,
    deleteEvent,
    registerForEvent,
    getOrganizedEvents,
    getJoinedEvents,
  };