const mongoose = require('mongoose');

const OrderItemSchema = new mongoose.Schema({
  dessert: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Dessert',
    required: true
  },
  variant: {
    name: String,
    price: Number
  },
  modifiers: [{
    name: String,
    extraPrice: Number
  }],
  quantity: {
    type: Number,
    required: true,
    min: 1
  },
  customText: {
    type: String, // "Name on Cake" text
    maxLength: 50
  },
  specialInstructions: String,
  subtotal: {
    type: Number,
    required: true
  }
});

const OrderSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  items: [OrderItemSchema],
  totalAmount: {
    type: Number,
    required: true
  },
  gstAmount: {
    type: Number,
    required: true
  },
  discountApplied: {
    type: Number,
    default: 0
  },
  grandTotal: {
    type: Number,
    required: true
  },
  pickupDate: {
    type: Date,
    required: true
  },
  status: {
    type: String,
    enum: ['PENDING', 'VERIFIED', 'PREPARING', 'READY', 'COMPLETED', 'CANCELLED'],
    default: 'PENDING'
  },
  invoicePath: String, // Path to generated PDF
  paymentStatus: {
    type: String,
    enum: ['UNPAID', 'PAID'],
    default: 'UNPAID' // Since we handle COD / Pay at Store
  },
  isReported: {
    type: Boolean,
    default: false
  },
  reportReason: String
}, { timestamps: true });

module.exports = mongoose.model('Order', OrderSchema);
