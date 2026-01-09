# PrimeTrade Backend Assignment - MERN Stack

A scalable Role-Based Access Control (RBAC) system with a product management dashboard, built using the MERN stack (MongoDB, Express, React, Node.js).

## 🚀 Features
- **Authentication**: Secure JWT-based login & registration.
- **RBAC**: Role-based access (User vs Admin) for sensitive operations.
- **Product CRUD**: Users can create products; Admins can manage all products.
- **UI**: Modern React Dashboard with TailwindCSS.

## ⚙️ Installation & Setup

### Backend Setup
```bash
cd server
npm install
# Create a .env file with: MONGO_URI, JWT_SECRET, PORT=5000
npx nodemon server.js

Frontend Setup
Bash
cd client
npm install
npm run dev

📡 API Endpoints
POST /api/auth/register - Register user
POST /api/auth/login - Login
GET /api/products - List products
POST /api/products - Create product (Protected)
DELETE /api/products/:id - Delete product (Owner/Admin only) what is this 