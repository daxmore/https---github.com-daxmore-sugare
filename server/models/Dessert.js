const mongoose = require('mongoose');

const VariantSchema = new mongoose.Schema({
  name: { type: String, required: true }, // e.g., '0.5kg', '1kg', '2kg'
  price: { type: Number, required: true },
  stock: { type: Number, default: 0 }
});

const ModifierSchema = new mongoose.Schema({
  name: { type: String, required: true }, // e.g., 'Sugar-Free', 'Eggless', 'Extra Chocolate'
  extraPrice: { type: Number, default: 0 }
});

const DessertSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  basePrice: {
    type: Number,
    required: true,
  },
  category: {
    type: String,
    enum: ['Cake', 'Pastry', 'Cookie'],
    required: true,
  },
  image: {
    type: String, // Hero image path
    required: true,
  },
  thumbnail: {
    type: String, // Compressed thumbnail path
  },
  ingredients: {
    type: String,
    required: true,
  },
  allergens: {
    type: String,
    required: true,
  },
  servingSize: {
    type: String,
    required: true,
  },
  variants: [VariantSchema], // For size/weight options
  modifiers: [ModifierSchema], // For dietary/add-on options
  isFeatured: {
    type: Boolean,
    default: false
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Dessert', DessertSchema);
