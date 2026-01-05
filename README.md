# 🚀 Qeema Tech - Backend API

Welcome to the backend repository for the **Qeema Tech Educational Platform**. This robust RESTful API serves as the backbone of the system, managing data consistency, security, and business logic for both the Student Portal and Admin Dashboard.

Built with performance and scalability in mind, it leverages **Node.js** and **Express** for handling requests, **Prisma ORM** for type-safe database interactions, and **MySQL** for reliable data storage.

## ✨ Key Features

-   **🔐 Secure Authentication**: Full JWT-based authentication system with Role-Based Access Control (RBAC) to strictly separate Student and Admin privileges.
-   **📚 Lesson Management**: Comprehensive CRUD operations for managing educational content, including rich metadata.
-   **👤 User Profiles**: Dedicated endpoints for student profile management and school branding settings.
-   **❤️ Favorites System**: Logic to handle student favorites/bookmarks ensuring efficient data retrieval.
-   **🛡️ Robust Error Handling**: Centralized error management middleware for consistent API responses.
-   **🔌 Cors Configured**: Secure Cross-Origin Resource Sharing setup for seamless frontend integration.

## 🛠️ Technology Stack

-   **Runtime**: Node.js (v18+)
-   **Framework**: Express.js
-   **Database**: MySQL
-   **ORM**: Prisma
-   **Auth**: JSON Web Tokens (JWT) & Bcrypt

## 🚀 Getting Started

### 1. Prerequisites
Ensure you have **Node.js** and **MySQL** installed and running on your machine.

### 2. Installation
Clone the repository and install dependencies:
```bash
npm install
```

### 3. Environment Configuration
Create a `.env` file in the root directory:
```env
PORT=5000
DATABASE_URL="mysql://USER:PASSWORD@localhost:3306/qeema_db"
JWT_SECRET="your_secure_jwt_secret"
JWT_EXPIRES_IN="1d"
```

### 4. Database Setup
Run migrations to create the database schema:
```bash
npx prisma migrate dev --name init
```
Seed the database with initial Admin and Lesson data:
```bash
node prisma/seed.js
```

### 5. Run the Server
Start the development server:
```bash
npm run dev
```
The API will be available at `http://localhost:5000`.

## 📂 Project Structure

-   `src/modules`: Domain-driven module structure (Auth, Admin, Lessons, etc.).
-   `src/middlewares`: Custom middlewares for Auth validation and Error handling.
-   `prisma`: Database schema and seed scripts.

## 🤝 API Documentation
A complete Postman Collection is available in the root of the project workspace (`Qeema_Tech_Projet.postman_collection.json`) for testing all endpoints.
