const express = require('express');
const router = express.Router();
const { getWishlist, addToWishlist, removeFromWishlist } = require('../controllers/wishlistController');
const { verifyToken } = require('./verifyToken');

router.get('/', verifyToken, getWishlist);
router.post('/add', verifyToken, addToWishlist);
router.delete('/remove/:dessertId', verifyToken, removeFromWishlist);

module.exports = router;
