const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
  date: { type: Date, required: true },
  location: { type: String },
  organizer: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // Reference to organizer User
  participants: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],       // Array of participant User references
  capacity: { type: Number, default: 0 }, // Optional: Event capacity
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
}, {
  timestamps: true,
});

const Event = mongoose.model('Event', eventSchema);
module.exports = Event;