const express = require('express');
const router = express.Router();
const { createDessert, getDesserts, getDessertById, updateDessert, deleteDessert } = require('../controllers/dessertController');
const { verifyAdmin } = require('./verifyToken');

router.get('/', getDesserts);
router.get('/:id', getDessertById);

// Admin Only Routes
router.post('/', verifyAdmin, createDessert);
router.put('/:id', verifyAdmin, updateDessert);
router.delete('/:id', verifyAdmin, deleteDessert);

module.exports = router;
