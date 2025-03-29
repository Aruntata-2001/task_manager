# Task Manager Application

A full-stack task management application built with the MERN stack (MongoDB, Express.js, React.js, Node.js). This application allows users to create, manage, and organize their tasks with features like categorization, tagging, and status tracking.

## Features

- User Authentication (Register/Login)
- Task Management (Create, Read, Update, Delete)
- Task Categorization
- Task Tagging
- Task Status Tracking (Pending/Completed)
- Search and Filter Tasks
- Responsive Design

## Technologies Used

### Frontend
- React.js
- Material-UI (MUI)
- React Router
- Axios
- React Icons

### Backend
- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT Authentication
- CORS

### Development Tools
- Git & GitHub
- VS Code
- Postman (for API testing)

## Prerequisites

Before you begin, ensure you have the following installed:
- Node.js (v14 or higher)
- MongoDB
- npm or yarn

## Setup Instructions

1. Clone the repository:
```bash
git clone https://github.com/Aruntata-2001/task_manager.git
cd task_manager
```

2. Backend Setup:
```bash
cd backend
npm install
```

3. Create a `.env` file in the backend directory with the following variables:
```
PORT=5000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
```

4. Frontend Setup:
```bash
cd frontend
npm install
```

5. Create a `.env` file in the frontend directory:
```
REACT_APP_API_URL=http://localhost:5000
```

## Running the Application

1. Start the Backend Server:
```bash
cd backend
npm start
```
The backend server will run on http://localhost:5000

2. Start the Frontend Development Server:
```bash
cd frontend
npm start
```
The frontend application will run on http://localhost:3000

## Deployment

The application is deployed on:
- Frontend: Vercel (https://task-manager-red-mu.vercel.app)
- Backend: Render (https://task-manager-backend-pdye.onrender.com)
- Database: MongoDB Atlas

## Development Assumptions

1. User Authentication:
   - Users will register with email and password
   - JWT tokens will be used for authentication
   - User sessions will be managed through localStorage

2. Task Management:
   - Tasks will have a title, description, category, and status
   - Tasks can be tagged for better organization
   - Tasks can be filtered by status and category
   - Tasks can be searched by title or description

3. Data Storage:
   - MongoDB will be used as the primary database
   - Mongoose will be used for data modeling and validation
   - Data will be stored in collections for users and tasks

## Challenges Faced and Solutions

1. CORS Issues:
   - Challenge: Cross-origin requests were blocked during development
   - Solution: Implemented proper CORS configuration in the backend using the cors middleware

2. Authentication Flow:
   - Challenge: Managing user sessions and token-based authentication
   - Solution: Implemented JWT-based authentication with proper token storage and validation

3. State Management:
   - Challenge: Managing application state across components
   - Solution: Used React's Context API and local storage for state persistence

4. Deployment:
   - Challenge: Configuring environment variables and database connections for production
   - Solution: Set up proper environment variables in Vercel and Render, configured MongoDB Atlas for production

5. Responsive Design:
   - Challenge: Ensuring the application works well on all device sizes
   - Solution: Used Material-UI's responsive components and custom styling

## API Endpoints

### User Routes
- POST /api/users/register - Register a new user
- POST /api/users/login - Login user
- GET /api/users/profile - Get user profile
- PUT /api/users/profile - Update user profile

### Task Routes
- GET /api/tasks - Get all tasks
- POST /api/tasks - Create a new task
- GET /api/tasks/:id - Get a specific task
- PUT /api/tasks/:id - Update a task
- DELETE /api/tasks/:id - Delete a task
- PATCH /api/tasks/:id/toggle - Toggle task status
