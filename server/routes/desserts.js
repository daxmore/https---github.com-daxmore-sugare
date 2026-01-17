const express = require('express');
const router = express.Router();
const { getDesserts, getDessertsByCategory, getDessertById, createDessert, updateDessert, deleteDessert } = require('../controllers/dessertController');

router.get('/', getDesserts);
router.get('/category/:category', getDessertsByCategory);
router.get('/:id', getDessertById);
router.post('/', createDessert);
router.put('/:id', updateDessert);
router.delete('/:id', deleteDessert);

module.exports = router;
