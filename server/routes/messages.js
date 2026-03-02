const express = require('express');
const router = express.Router();
const Message = require('../models/Message');
const { verifyAdmin } = require('./verifyToken');

// Submit a message (Public)
router.post('/send', async (req, res) => {
  try {
    const newMessage = new Message(req.body);
    await newMessage.save();
    res.status(201).json({ message: "Message sent successfully! We'll get back to you soon." });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get all messages (Admin)
router.get('/all', verifyAdmin, async (req, res) => {
  try {
    const messages = await Message.find().sort({ createdAt: -1 });
    res.json(messages);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
