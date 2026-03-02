const express = require('express');
const router = express.Router();
const { register, login, logout, getMe, getAllUsers, updateUser, deleteUser } = require('../controllers/authController');
const { verifyToken, verifyAdmin } = require('./verifyToken');

router.post('/register', register);
router.post('/login', login);
router.post('/logout', logout);
router.get('/me', verifyToken, getMe);

// Admin Routes
router.get('/all', verifyAdmin, getAllUsers);
router.put('/update/:id', verifyAdmin, updateUser);
router.delete('/:id', verifyAdmin, deleteUser);

module.exports = router;
