const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const mongoSanitize = require('mongo-sanitize');
const path = require('path');

const authRoutes = require('./routes/auth');
const dessertRoutes = require('./routes/desserts');
const wishlistRoutes = require('./routes/wishlist');
const orderRoutes = require('./routes/orderRoutes');
const couponRoutes = require('./routes/coupon.js');
const messageRoutes = require('./routes/messages');

const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(cors({
  origin: 'http://localhost:5173', // Adjust based on your frontend port
  credentials: true
}));
app.use(express.json());
app.use(cookieParser());
app.use((req, res, next) => {
  req.body = mongoSanitize(req.body);
  req.query = mongoSanitize(req.query);
  req.params = mongoSanitize(req.params);
  next();
});

// Serve Static Files
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use('/invoices', express.static(path.join(__dirname, 'invoices')));

// Database Connection
const dbURI = process.env.MONGODB_URI || 'mongodb://localhost:27017/dessert-selling';
mongoose.connect(dbURI)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/desserts', dessertRoutes);
app.use('/api/wishlist', wishlistRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/coupons', couponRoutes);
app.use('/api/messages', messageRoutes);

app.get('/', (req, res) => {
  res.send('Dessert Selling Server is running!');
});

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
