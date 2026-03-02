# 🍰 Sugaré - Modern Artisan Boutique Bakery

**Sugaré** is a premium, high-performance E-commerce and Order Management System (OMS) designed specifically for luxury boutique bakeries. It has been transformed from a basic application into an enterprise-grade platform featuring advanced image processing, automated invoicing, and a sophisticated loyalty ecosystem.

---

## ✨ Project Highlights
- **Elegant Redesign:** A "Modern Artisan Minimalist" aesthetic featuring soft creams, terracotta accents, and high-end typography (Fraunces & Inter).
- **Complex Product Logic:** Support for weight-based variants (0.5kg, 1kg, 2kg) and dietary modifiers (Sugar-Free, Eggless).
- **Loyalty Ecosystem:** Built-in "Cake Coins" system and tiered memberships (BASIC & GOLD).
- **Automated Operations:** Server-side PDF invoice generation and automated WebP image optimization.

---

## 🚀 Technology Stack

### Frontend
- **Framework:** React 19 (Vite)
- **State Management:** Zustand (High-performance global state)
- **Data Fetching:** TanStack Query v5 (Caching & Polling)
- **Styling:** Tailwind CSS v4 (Custom Design System)
- **Animations:** Framer Motion 12
- **Notifications:** React Hot Toast

### Backend
- **Server:** Node.js & Express 5
- **Database:** MongoDB & Mongoose
- **Security:** HttpOnly JWT Cookies, bcryptjs, Mongo-Sanitize
- **Media:** Sharp (Artisan Image Pipeline)
- **Documents:** PDFKit (Branded Invoicing)

---

## 🛠️ How to Run the Project

### 1. Prerequisites
- **Node.js** (v18 or higher)
- **MongoDB** (Running locally on port 27017)

### 2. Backend Setup
```bash
cd server
npm install
# Create a .env file if needed (JWT_SECRET, etc.)
node index.js
```

### 3. Frontend Setup
```bash
cd client
npm install
npm run dev
```

### 4. Seeding the Database
To wipe the database and import the professional artisan dataset:
```bash
# From the root directory
node server/seeder.js
```

---

## 🔐 Credentials for Validation

| Role | Username | Password | Notes |
| :--- | :--- | :--- | :--- |
| **Admin** | `admin` | `adminpassword123` | Access to Artisan Hub |
| **Test User** | `testuser` | `password123` | GOLD Member, Birthday Today |

---

## 🎯 Key Features to Test

### **For Customers:**
1. **Confetti Celebration:** Log in as `testuser` on the home page to trigger the Birthday event.
2. **Masterpiece Customizer:** Select any cake to see the multi-step wizard with real-time "Name on Cake" preview.
3. **Reward Hub:** Apply the coupon `BDAY20` in the basket to see percentage-based discounts.
4. **Order Concierge:** View "Order History" to download professionally designed **Rupee (₹)** invoices.

### **For Administrators:**
1. **Artisan Hub:** View live business pulse (Revenue, Reservations, unread Messages).
2. **Kitchen Monitor:** Advance orders through the "Kitchen Flow" (Verify → Bake → Ready → Done).
3. **Customer CRM:** Manually adjust loyalty coins (Add/Remove) or toggle GOLD memberships.
4. **Catalog Master:** Add new products by either **Uploading a File** or **Pasting a URL**.

---

## 📁 Directory Structure
- `/client`: React source code and Design System.
- `/server`: API, Models, and Invoicing logic.
- `/data`: Source JSON files for the automated seeder.
- `/server/uploads`: Optimized WebP asset storage.
- `/server/invoices`: Branded PDF storage.

---

**Sugaré** — *Sweetness, Elevated.*
