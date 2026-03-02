const express = require('express');
const router = express.Router();
const { validateCoupon, createCoupon, getAllCoupons, updateCoupon, deleteCoupon } = require('../controllers/couponController');
const { verifyToken, verifyAdmin } = require('./verifyToken');

router.post('/validate', verifyToken, validateCoupon);

// Admin Routes
router.get('/all', verifyAdmin, getAllCoupons);
router.post('/create', verifyAdmin, createCoupon);
router.put('/:id', verifyAdmin, updateCoupon);
router.delete('/:id', verifyAdmin, deleteCoupon);

module.exports = router;
