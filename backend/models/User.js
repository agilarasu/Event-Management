const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['organizer', 'participant'], default: 'participant' },
  eventsOrganized: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Event' }], // For organizers
  eventsJoined: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Event' }],    // For participants
}, {
  timestamps: true, // Adds createdAt and updatedAt
});

// Password hashing middleware
userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) {
    next(); // If password is not modified, proceed
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

// Method to compare passwords
userSchema.methods.matchPassword = async function(enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

const User = mongoose.model('User', userSchema);
module.exports = User;