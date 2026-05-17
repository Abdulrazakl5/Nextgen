const mongoose = require('mongoose');

const personSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: [true, 'First name is required'],
    trim: true,
    index: true,
  },
  lastName: {
    type: String,
    required: [true, 'Last name is required'],
    trim: true,
    index: true,
  },
  dateOfBirth: {
    type: Date,
    required: [true, 'Date of birth is required'],
    index: true,
  },
  email: {
    type: String,
    sparse: true,
    lowercase: true,
  },
  phone: {
    type: String,
    sparse: true,
  },
  country: {
    type: String,
    required: true,
    index: true,
  },
  city: {
    type: String,
    index: true,
  },
  address: String,
  occupation: String,
  profilePicture: String,
  bio: String,
  isVerified: {
    type: Boolean,
    default: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

// Text index for full-text search
personSchema.index({ firstName: 'text', lastName: 'text', email: 'text' });

module.exports = mongoose.model('Person', personSchema);
