const Order = require('../models/Order');
const User = require('../models/User');
const Coupon = require('../models/Coupon');
const { generateInvoice } = require('../utils/pdfGenerator');

const createOrder = async (req, res) => {
  try {
    const { items, pickupDate, couponCode } = req.body;
    const userId = req.user.id;

    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    let totalAmount = 0;

    // Process items and calculate totals
    const processedItems = items.map(item => {
      let itemSubtotal = item.variant.price * item.quantity;
      item.modifiers.forEach(mod => {
        itemSubtotal += mod.extraPrice * item.quantity;
      });
      totalAmount += itemSubtotal;
      return { ...item, subtotal: itemSubtotal };
    });

    let discountApplied = 0;

    // 1. Membership Discount (10% Gold)
    if (user.membershipTier === 'GOLD') {
      discountApplied += Math.round(totalAmount * 0.1 * 100) / 100;
    }

    // 2. Coupon Discount (Server-side validation)
    if (couponCode) {
        const coupon = await Coupon.findOne({ code: couponCode.toUpperCase(), isActive: true });
        if (coupon && new Date() <= coupon.expiryDate && totalAmount >= coupon.minOrderAmount) {
            let couponDiscount = 0;
            if (coupon.discountType === 'PERCENTAGE') {
                couponDiscount = (totalAmount * coupon.discountValue) / 100;
            } else {
                couponDiscount = coupon.discountValue;
            }
            discountApplied += couponDiscount;
            
            // Increment coupon usage
            coupon.usedCount += 1;
            await coupon.save();
        }
    }

    const taxableAmount = totalAmount - discountApplied;
    const gstAmount = Math.round(taxableAmount * 0.05 * 100) / 100; // 5% GST
    const grandTotal = taxableAmount + gstAmount;

    const newOrder = new Order({
      user: userId,
      items: processedItems,
      totalAmount,
      gstAmount,
      discountApplied,
      grandTotal,
      pickupDate
    });

    await newOrder.save();

    // Update User Loyalty Points (Cake Coins)
    // 1 Cake Coin for every $10 spent
    const coinsEarned = Math.floor(grandTotal / 10);
    user.cakeCoins += coinsEarned;
    await user.save();

    // Populate dessert info for invoice
    const populatedOrder = await Order.findById(newOrder._id).populate('items.dessert');
    
    // Generate PDF Invoice
    const invoicePath = await generateInvoice(populatedOrder, user);
    newOrder.invoicePath = invoicePath;
    await newOrder.save();

    res.status(201).json({ 
      message: "Order placed successfully", 
      order: newOrder,
      coinsEarned 
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const getMyOrders = async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user.id })
      .populate('items.dessert')
      .sort({ createdAt: -1 });
    res.json(orders);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find()
      .populate('user', 'fullname username')
      .populate('items.dessert')
      .sort({ createdAt: -1 });
    res.json(orders);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const updateOrderStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const order = await Order.findByIdAndUpdate(
      req.params.id, 
      { status }, 
      { new: true }
    ).populate('user', 'fullname username').populate('items.dessert');
    res.json(order);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const reportOrder = async (req, res) => {
  try {
    const { reportReason } = req.body;
    const order = await Order.findById(req.params.id);
    if (!order) return res.status(404).json({ message: "Order not found" });

    // Allow if user owns it or if admin
    if (order.user.toString() !== req.user.id && !req.user.isAdmin) {
        return res.status(403).json({ message: "Unauthorized to report this order" });
    }

    order.isReported = true;
    order.reportReason = reportReason;
    await order.save();

    res.json(order);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = { createOrder, getMyOrders, getAllOrders, updateOrderStatus, reportOrder };
