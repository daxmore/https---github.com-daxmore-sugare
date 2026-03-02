const mongoose = require('mongoose');
const fs = require('fs');
const path = require('path');
const bcrypt = require('bcryptjs');

// Models
const User = require('./models/User');
const Dessert = require('./models/Dessert');
const Order = require('./models/Order');
const Wishlist = require('./models/Wishlist');
const Coupon = require('./models/Coupon');

const seedData = async () => {
  try {
    // 1. Connect to Database
    const dbURI = 'mongodb://localhost:27017/dessert-selling';
    await mongoose.connect(dbURI);
    console.log('--- 🛡️  CONNECTED TO MONGODB ---');

    // 2. Clear All Existing Collections
    console.log('--- 🧹  ERASING ALL DATABASE DATA... ---');
    await Promise.all([
        User.deleteMany(),
        Dessert.deleteMany(),
        Order.deleteMany(),
        Wishlist.deleteMany(),
        Coupon.deleteMany()
    ]);
    console.log('--- ✅  DATABASE IS NOW EMPTY ---');

    // 3. Load JSON Files
    const usersData = JSON.parse(fs.readFileSync(path.join(__dirname, '../data/users.json'), 'utf-8'));
    const dessertsData = JSON.parse(fs.readFileSync(path.join(__dirname, '../data/desserts.json'), 'utf-8'));
    const couponsData = JSON.parse(fs.readFileSync(path.join(__dirname, '../data/coupons.json'), 'utf-8'));

    // 4. Process and Insert Users (Hash Passwords)
    console.log('--- 👤  IMPORTING USERS... ---');
    for (let u of usersData) {
        const salt = await bcrypt.genSalt(10);
        u.password = await bcrypt.hash(u.password, salt);
    }
    await User.insertMany(usersData);

    // 5. Insert Desserts
    console.log('--- 🍰  IMPORTING DESSERTS... ---');
    await Dessert.insertMany(dessertsData);

    // 6. Insert Coupons
    console.log('--- 🎫  IMPORTING COUPONS... ---');
    await Coupon.insertMany(couponsData);

    console.log('--- 🚀  ALL DATA SEEDED SUCCESSFULLY! ---');
    console.log('\nCREDENTIALS FOR VALIDATION:');
    console.log('---------------------------');
    console.log('ADMIN: user: admin | pass: adminpassword123');
    console.log('TEST USER (GOLD): user: testuser | pass: password123');
    console.log('---------------------------');

    process.exit();
  } catch (error) {
    console.error('--- ❌ SEEDING FAILED ---');
    console.error(error);
    process.exit(1);
  }
};

seedData();
