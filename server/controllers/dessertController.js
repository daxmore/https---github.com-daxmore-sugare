const mongoose = require('mongoose');
const Dessert = require('../models/Dessert');
const Wishlist = require('../models/Wishlist');

// @desc    Fetch all desserts
// @route   GET /api/desserts
// @access  Public
const getDesserts = async (req, res) => {
  try {
    const desserts = await Dessert.find({});
    res.json(desserts);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Fetch desserts by category
// @route   GET /api/desserts/category/:category
// @access  Public
const getDessertsByCategory = async (req, res) => {
  try {
    const desserts = await Dessert.find({ category: req.params.category });
    res.json(desserts);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Fetch single dessert
// @route   GET /api/desserts/:id
// @access  Public
const getDessertById = async (req, res) => {
  try {
    const dessert = await Dessert.findById(req.params.id);
    if (dessert) {
      res.json(dessert);
    } else {
      res.status(404).json({ message: 'Dessert not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

const createDessert = async (req, res) => {
  try {
    const dessert = new Dessert(req.body);
    const newDessert = await dessert.save();
    res.status(201).json(newDessert);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// @desc    Update a dessert
// @route   PUT /api/desserts/:id
// @access  Private/Admin
const updateDessert = async (req, res) => {
  try {
    const dessert = await Dessert.findById(req.params.id);

    if (dessert) {
      dessert.name = req.body.name || dessert.name;
      dessert.category = req.body.category || dessert.category;
      dessert.price = req.body.price || dessert.price;
      dessert.description = req.body.description || dessert.description;
      dessert.image = req.body.image || dessert.image;
      dessert.ingredients = req.body.ingredients || dessert.ingredients;
      dessert.allergens = req.body.allergens || dessert.allergens;
      dessert.servingSize = req.body.servingSize || dessert.servingSize;

      const updatedDessert = await dessert.save();
      res.json(updatedDessert);
    } else {
      res.status(404).json({ message: 'Dessert not found' });
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// @desc    Delete a dessert
// @route   DELETE /api/desserts/:id
// @access  Private/Admin
const deleteDessert = async (req, res) => {
  try {
    const dessert = await Dessert.findById(req.params.id);

    if (!dessert) {
      return res.status(404).json({ message: 'Dessert not found' });
    }

    // First, remove dessert from all wishlists
    await Wishlist.updateMany(
      { desserts: dessert._id },
      { $pull: { desserts: dessert._id } }
    );

    // Then delete the dessert
    await Dessert.findByIdAndDelete(req.params.id);
    
    res.json({ message: 'Dessert removed successfully' });
  } catch (error) {
    console.error('Delete dessert error:', error);
    res.status(500).json({ message: 'Server error while deleting dessert' });
  }
};

module.exports = { getDesserts, getDessertsByCategory, getDessertById, createDessert, updateDessert, deleteDessert };
