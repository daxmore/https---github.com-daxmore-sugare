const Wishlist = require('../models/Wishlist');
const User = require('../models/User');

// @desc    Get user wishlist
// @route   GET /api/wishlist/:userId
// @access  Public
const getWishlist = async (req, res) => {
  try {
    const { userId } = req.params;
    const wishlist = await Wishlist.findOne({ user: userId }).populate('desserts');
    if (!wishlist) {
      return res.status(404).json({ message: 'Wishlist not found' });
    }
    res.json(wishlist);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Add dessert to wishlist
// @route   POST /api/wishlist
// @access  Public
const addToWishlist = async (req, res) => {
  const { userId, dessertId } = req.body;

  try {
    let wishlist = await Wishlist.findOne({ user: userId });

    if (!wishlist) {
      wishlist = await Wishlist.create({ user: userId, desserts: [dessertId] });
      await User.findByIdAndUpdate(userId, { wishlist: wishlist._id });
    } else {
      if (!wishlist.desserts.includes(dessertId)) {
        wishlist.desserts.push(dessertId);
        await wishlist.save();
      }
    }

    res.status(201).json(wishlist);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Remove dessert from wishlist
// @route   DELETE /api/wishlist
// @access  Public
const removeFromWishlist = async (req, res) => {
  const { userId, dessertId } = req.body;

  try {
    const wishlist = await Wishlist.findOne({ user: userId });

    if (wishlist) {
      wishlist.desserts = wishlist.desserts.filter(d => d.toString() !== dessertId);
      await wishlist.save();
    }

    res.json(wishlist);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = { getWishlist, addToWishlist, removeFromWishlist };