const Wishlist = require('../models/Wishlist');

const getWishlist = async (req, res) => {
  try {
    const wishlist = await Wishlist.findOne({ user: req.user.id }).populate('desserts');
    res.json(wishlist ? wishlist.desserts : []);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const addToWishlist = async (req, res) => {
  try {
    const { dessertId } = req.body;
    let wishlist = await Wishlist.findOne({ user: req.user.id });

    if (!wishlist) {
      wishlist = new Wishlist({ user: req.user.id, desserts: [dessertId] });
    } else {
      if (!wishlist.desserts.includes(dessertId)) {
        wishlist.desserts.push(dessertId);
      }
    }

    await wishlist.save();
    res.json(wishlist);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const removeFromWishlist = async (req, res) => {
  try {
    const { dessertId } = req.params;
    let wishlist = await Wishlist.findOne({ user: req.user.id });

    if (wishlist) {
      wishlist.desserts = wishlist.desserts.filter(id => id.toString() !== dessertId);
      await wishlist.save();
    }

    res.json(wishlist);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = { getWishlist, addToWishlist, removeFromWishlist };
