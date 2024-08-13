# Task Management System

This is a simple RESTful API for a Task Management System built with Node.js, Express.js, and MongoDB. The API supports user authentication, task management, and provides features such as sorting, filtering, and rate limiting.

## Features

- User Registration and Login with JWT Authentication
- CRUD Operations for Tasks (Create, Read, Update, Delete)
- Sorting and Filtering Tasks by Due Date, Status, etc.
- Rate Limiting to Prevent Abuse
- Centralized Error Handling

## Tech Stack

- **Node.js**
- **Express.js**
- **MongoDB** (Mongoose for object modeling)
- **JWT** (JSON Web Tokens for authentication)
- **dotenv** (Environment variable management)
- **express-rate-limit** (Rate limiting middleware)
- **Postman** (API testing)

## Project Structure

.
├── config
│ └── db.js # MongoDB connection setup
├── controllers
│ └── authController.js # Authentication logic
│ └── taskController.js # Task management logic
├── middlewares
│ └── authMiddleware.js # JWT authentication middleware
├── models
│ └── User.js # User model schema
│ └── Task.js # Task model schema
├── routes
│ └── authRoutes.js # Authentication routes
│ └── taskRoutes.js # Task routes
├── app.js # Express application setup
├── server.js # Server setup
├── .env # Environment variables
└── README.md # Project documentation

## Getting Started

### Prerequisites

- **Node.js** (v14 or later)
- **MongoDB** (A running instance or MongoDB Atlas account)
- **Postman** (For API testing)

### Installation

1.  **Clone the repository:**

    ```bash
    git clone https://github.com/your-username/task-management-system.git
    cd task-management-system
    ```

2.  **Install dependencies:**

    npm install

3.  **Set up environment variables:**

        Create a .env file in the root of your project and add the following:

        ```bash
        MONGO_URI=mongodb://localhost:27017/taskmanager
        JWT_SECRET=your_jwt_secret
        PORT=5000
        ```

4.  **Start the server:**

    ```bash

    npm run dev
    The server will run on http://localhost:5000.
    ```

### API Endpoints

Here’s a quick guide on how to use the API with Postman.

1. **User Registration:**

   Endpoint: /api/auth/register
   Method: POST
   Body:

   ```````json

   {
   "username": "Shivam",
   "password": "ShivRaj"
   }
   ```

   Response:

   ``````json
   {
     "_id": "user_id",
     "username": "Shivam",
     "token": "jwt_token"
   }
   ```

   ```````

2. **User Login:**

   Endpoint: /api/auth/login
   Method: POST
   Body:

   ```json
   {
     "username": "john_doe",
     "password": "securePassword123"
   }
   ```

   Response:

   ```json
   {
     "_id": "user_id",
     "username": "john_doe",
     "token": "jwt_token"
   }
   ```

3. **Create a Task:**

   Endpoint: /api/tasks
   Method: POST
   Headers:

   ```plaintext
   Authorization: Bearer jwt_token
   ```

   Body:

   ````json
   {
   "title": "Complete Project",
   "description": "Finish the task management API",
   "dueDate": "2024-08-15T00:00:00.000Z",
   "status": "pending"
   }
   ```

   Response:
   ```json
   {
   "_id": "task_id",
   "title": "Complete Project",
   "description": "Finish the task management API",
   "dueDate": "2024-08-15T00:00:00.000Z",
   "status": "pending",
   "user": "user_id",
   "createdAt": "2024-08-09T00:00:00.000Z",
   "updatedAt": "2024-08-09T00:00:00.000Z"
   }
   ````

4. **Get All Tasks:**

   Endpoint: /api/tasks
   Method: GET
   Headers:

   ```plaintext

   Authorization: Bearer jwt_token
   ```

   Query Parameters:
   status: Filter tasks by status (optional)
   sortBy: Field to sort by, e.g., dueDate, status (optional)
   order: Sort order, asc or desc (optional)
   Example URL:

   ```plaintext
   http://localhost:5000/api/tasks?status=pending&sortBy=dueDate&order=asc
   ```

   Response:

   ```json
   [
     {
       "_id": "task_id_1",
       "title": "Complete Project",
       "description": "Finish the task management API",
       "dueDate": "2024-08-15T00:00:00.000Z",
       "status": "pending",
       "user": "user_id",
       "createdAt": "2024-08-09T00:00:00.000Z",
       "updatedAt": "2024-08-09T00:00:00.000Z"
     }
   ]
   ```

5. **Update a Task:**

   Endpoint: /api/tasks/:id
   Method: PUT
   Headers:

   ```plaintext
   Authorization: Bearer jwt_token
   ```

   Body:

   ````json
   {
   "title": "Complete Project (Updated)",
   "status": "in-progress"
   }
   ```
   Response:
   ```json
   {
   "_id": "task_id",
   "title": "Complete Project (Updated)",
   "description": "Finish the task management API",
   "dueDate": "2024-08-15T00:00:00.000Z",
   "status": "in-progress",
   "user": "user_id",
   "createdAt": "2024-08-09T00:00:00.000Z",
   "updatedAt": "2024-08-09T00:00:00.000Z"
   }
   ````

6. **Delete a Task:**

   Endpoint: /api/tasks/:id
   Method: DELETE
   Headers:

   ```plaintext
   Authorization: Bearer jwt_token
   ```

   Response:

   ```json
   {
     "message": "Task removed"
   }
   ```
