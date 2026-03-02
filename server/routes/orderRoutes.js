const express = require('express');
const router = express.Router();
const { createOrder, getMyOrders, getAllOrders, updateOrderStatus, reportOrder } = require('../controllers/orderController');
const { verifyToken, verifyAdmin } = require('./verifyToken');

router.post('/', verifyToken, createOrder);
router.get('/my-orders', verifyToken, getMyOrders);

// Admin Routes
router.get('/all', verifyAdmin, getAllOrders);
router.patch('/:id/status', verifyAdmin, updateOrderStatus);
router.patch('/:id/report', verifyToken, reportOrder);

module.exports = router;
