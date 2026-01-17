const router = require('express').Router();
const { verifyToken, verifyTokenAndAdmin } = require('./verifyToken');
const orderController = require('../controllers/orderController');

// Create Order
router.post('/', verifyToken, orderController.createOrder);

// Get User Orders
router.get('/my-orders', verifyToken, orderController.getUserOrders);

// Get All Orders (Admin)
router.get('/', verifyTokenAndAdmin, orderController.getAllOrders);

// Update Order Status (Admin)
router.put('/:id/status', verifyTokenAndAdmin, orderController.updateOrderStatus);

// Delete Order
router.delete('/:id', verifyToken, orderController.deleteOrder);

module.exports = router;
