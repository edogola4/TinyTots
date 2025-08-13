# TinyTots Backend

This is the backend server for the TinyTots application, built with Node.js, Express, and MongoDB.

## Features

- User authentication (register, login, get current user)
- Protected routes with JWT
- Role-based authorization
- Error handling
- Environment configuration

## Prerequisites

- Node.js (v14 or later)
- npm or yarn
- MongoDB (local or cloud instance)

## Setup

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file in the root directory with the following variables:
   ```
   PORT=5000
   MONGODB_URI=mongodb://localhost:27017/tinytots
   JWT_SECRET=your_jwt_secret_here
   NODE_ENV=development
   ```
4. Start the development server:
   ```bash
   npm run dev
   ```

## Available Scripts

- `npm start` - Start the production server
- `npm run dev` - Start the development server with nodemon
- `npm test` - Run tests (TBD)

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user (protected)

## Project Structure

```
server/
├── src/
│   ├── config/         # Configuration files
│   ├── controllers/    # Route controllers
│   ├── middleware/     # Custom middleware
│   ├── models/         # Mongoose models
│   ├── routes/         # Route definitions
│   ├── app.js          # Express app configuration
│   └── server.js       # Server entry point
├── .env.example       # Example environment variables
├── package.json       # Project dependencies
└── README.md          # This file
```

## Environment Variables

- `PORT` - Port to run the server on (default: 5000)
- `MONGODB_URI` - MongoDB connection string
- `JWT_SECRET` - Secret for signing JWT tokens
- `NODE_ENV` - Environment (development, production)

## License

MIT
