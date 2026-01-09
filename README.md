# PrimeTrade Assignment - MERN Stack Project

A scalable Role-Based Access Control (RBAC) system with a product management dashboard, built using the MERN stack.

## 🚀 Features
- **Authentication**: Secure JWT-based login & registration.
- **RBAC**: Role-based access (User vs Admin).
- **UI**: Modern Glassmorphism Dashboard with Tailwind CSS.
- **Scalability**: Architecture designed for high traffic (see `SCALABILITY.md`).

---

## 🛠️ How to Run Locally (Step-by-Step)

To run this project, you need **two separate terminals** (one for the Server, one for the Client).

### Step 1: Start the Backend (Terminal 1)
1. Open your first terminal.
2. Navigate to the server folder and install dependencies:
   ```bash
   cd server
   npm install

3. Create a .env file in the server folder with your MongoDB URI (or use local DB):

MONGO_URI=mongodb://127.0.0.1:27017/primetrade
JWT_SECRET=secretkey123
PORT=5000

4. Start the server:
    ```bash
npx nodemon server.js

Note: Keep this terminal OPEN. Do not close it.

### Step 2: Start the Frontend (Terminal 2)
1. Open a NEW terminal (or split the current one).

2. Navigate to the client folder and install dependencies:
   ```bash
cd client
npm install

3. Start the React app:
   ```bash
npm run dev

### Open the link shown (usually http://localhost:5173) in your browser.

📡 API Endpoints
POST /api/auth/register - Register user

POST /api/auth/login - Login

GET /api/products - List products

POST /api/products - Create product (Protected)

DELETE /api/products/:id - Delete product (Owner/Admin only)