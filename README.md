# Qeema Backend API

This is the RESTful API service for the Qeema Tech Educational Platform.

## 🛠 Tech Stack
-   **Node.js** & **Express.js**: Server framework.
-   **Prisma**: ORM for MySQL.
-   **MySQL**: Relational Database.
-   **JWT**: Authentication.

## 🚀 Setup & Installation

1.  **Install Dependencies**
    ```bash
    npm install
    ```

2.  **Environment Variables**
    Create a `.env` file in this directory:
    ```env
    PORT=5000
    DATABASE_URL="mysql://USER:PASSWORD@localhost:3306/qeema_db"
    JWT_SECRET="your_secret_key"
    JWT_EXPIRES_IN="1d"
    ```

3.  **Database Migration**
    Apply the Prisma schema to your database:
    ```bash
    npx prisma migrate dev --name init
    ```

4.  **Seed Database**
    Populate the database with the initial Admin user and sample lessons:
    ```bash
    node prisma/seed.js
    ```
    *Admin Credentials:* `01000000000` / `admin123`

5.  **Run Development Server**
    ```bash
    npm run dev
    ```
    Server starts at `http://localhost:5000`.

## 📂 Project Structure
-   `src/modules`: Feature-based modules (Auth, Lessons, Admin, etc.).
-   `src/middlewares`: Auth and Error handling middlewares.
-   `prisma/schema.prisma`: Database schema definition.

## 🔑 API Endpoints
Refer to the `Qeema_Tech_Projet.postman_collection.json` in the root directory for full API documentation.
