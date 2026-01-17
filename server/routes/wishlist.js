const express = require('express');
const router = express.Router();
const { getWishlist, addToWishlist, removeFromWishlist } = require('../controllers/wishlistController');

// For now, we are not protecting the routes. We will add auth middleware later.
// const { protect } = require('../middleware/authMiddleware');

router.route('/:userId').get(getWishlist);
router.route('/').post(addToWishlist);
router.route('/').delete(removeFromWishlist);

module.exports = router;
