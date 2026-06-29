const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please provide your full name'],
    trim: true
  },
  fullName: {
    type: String,
    trim: true
  },
  username: {
    type: String,
    unique: true,
    sparse: true,
    trim: true,
    lowercase: true,
    minlength: [3, 'Username must be at least 3 characters long']
  },
  email: {
    type: String,
    required: [true, 'Please provide your email address'],
    unique: true,
    lowercase: true,
    trim: true,
    match: [/^\S+@\S+\.\S+$/, 'Please provide a valid email address']
  },
  password: {
    type: String,
    required: [true, 'Please provide a password'],
    minlength: 8
  },
  role: {
    type: String,
    enum: ['coordinator', 'coremember', 'mentor', 'member', 'web-creator', 'user'],
    default: 'user'
  },
  profilePhotoUrl: {
    type: String,
    default: ''
  },
  bio: {
    type: String,
    default: ''
  },
  interests: {
    type: [String],
    default: []
  },
  avatarUrl: {
    type: String,
    default: ''
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('User', UserSchema);
