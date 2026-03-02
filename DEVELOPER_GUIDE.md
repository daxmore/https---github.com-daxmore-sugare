# 🍰 Boutique Bakery - Developer & Upgrade Guide

Welcome to the Boutique Bakery Enterprise platform. This project has been upgraded from a basic CRUD app to a high-performance, secure Order Management System (OMS).

## 🚀 Tech Stack
- **Frontend:** React 19 (Vite), Tailwind CSS, Framer Motion (Animations), Zustand (State), React Query (Data).
- **Backend:** Node.js (Express 5), MongoDB (Mongoose), Sharp (Image Optimization), PDFKit (Invoicing).
- **Security:** HttpOnly JWT Cookies, Password Strength Meters, Mongo Sanitization.

## 📁 Project Structure & Data
- `/client`: Frontend source code.
- `/server`: Backend API and database logic.
- `/data`: Source JSON files for seeding the database.
- `/server/uploads`: Optimized WebP images (Hero & Thumbnails).
- `/server/invoices`: Generated PDF invoices for every order.

## 🛠️ How to Reset & Seed Data
Run the following command from the root directory to wipe the database and import fresh professional data:
```bash
node server/seeder.js
```

## 🔐 Credentials for Testing
| Role | Username | Password | Notes |
| :--- | :--- | :--- | :--- |
| **Admin** | `admin` | `adminpassword123` | Full dashboard access |
| **Gold User** | `rahultest` | `password123` | 250 Coins, Birthday: March 3rd |
| **Basic User** | `alice99` | `password123` | New account, 10 coins |

## ✨ Key Functionalities to Validate
1. **Confetti & Birthday Reward:** Log in as `rahultest`. Since the birthday matches "Today", a confetti celebration and a 20% code (`BDAY20`) will appear.
2. **Cake Customizer:** Go to Belgian Truffle Cake. Try selecting different weights (0.5kg vs 1kg). Add "Sugar-Free" and see the price update.
3. **Admin Bake Sheet:** Go to Admin Dashboard -> Bake Sheet. You will see detailed preparation instructions for every order.
4. **Loyalty System:** Place an order as `rahultest`. Note how the 10% Gold discount is applied automatically and new Cake Coins are earned.
5. **PDF Invoicing:** View "Order History" and download the PDF. It contains a full breakdown including GST.

## 🛠️ Maintenance Tips
- **Images:** Admins upload raw photos via the UI. The backend uses `Sharp` to convert them to WebP. Never serve original JPEGs to save bandwidth.
- **Security:** Tokens are stored in HttpOnly cookies. Ensure `CORS` origins are correct in `server/index.js` for production.
