const mongoose = require('mongoose');

const MessageSchema = new mongoose.Schema({
  fullname: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  subject: {
    type: String,
    required: true
  },
  message: {
    type: String,
    required: true
  },
  status: {
    type: String,
    enum: ['NEW', 'READ', 'REPLIED'],
    default: 'NEW'
  }
}, { timestamps: true });

module.exports = mongoose.model('Message', MessageSchema);
