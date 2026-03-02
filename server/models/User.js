const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  fullname: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  isAdmin: {
    type: Boolean,
    default: false,
  },
  membershipTier: {
    type: String,
    enum: ['BASIC', 'GOLD'],
    default: 'BASIC'
  },
  cakeCoins: {
    type: Number,
    default: 0 // Loyalty points system
  },
  birthday: {
    type: Date
  },
  anniversary: {
    type: Date
  },
  addresses: [{
    type: String, // Simple address string
  }],
  profileImage: {
    type: String,
    default: '',
  },
}, { timestamps: true });

const User = mongoose.model('User', userSchema);

module.exports = User;
