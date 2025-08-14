# TinyTots Backend

This is the backend server for the TinyTots application, built with Node.js, Express, and MongoDB.

## Features

- User authentication (register, login, get current user)
- Protected routes with JWT
- Role-based authorization (user, admin)
- Comprehensive admin dashboard
- Product management
- Order management
- User management
- File uploads
- Rate limiting
- Security best practices (helmet, xss-clean, hpp, etc.)
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
3. Copy `.env.example` to `.env` and update the values:
   ```bash
   cp .env.example .env
   ```
4. Start the development server:
   ```bash
   npm run dev
   ```

## Available Scripts

- `npm start` - Start the production server
- `npm run dev` - Start the development server with nodemon
- `npm test` - Run tests in watch mode
- `npm run test:coverage` - Run tests with coverage report

## Environment Variables

See `.env.example` for all available environment variables.

## API Endpoints

### Authentication
- `POST /api/v1/auth/register` - Register a new user
- `POST /api/v1/auth/login` - Login user
- `GET /api/v1/auth/me` - Get current user (protected)

### Admin Routes (Requires admin role)

#### Users
- `GET /api/v1/admin/users` - Get all users (with pagination, filtering, sorting)
- `GET /api/v1/admin/users/:id` - Get single user
- `POST /api/v1/admin/users` - Create new user (admin only)
- `PUT /api/v1/admin/users/:id` - Update user
- `DELETE /api/v1/admin/users/:id` - Delete user

#### Products
- `GET /api/v1/admin/products` - Get all products (with pagination, filtering, sorting)
- `POST /api/v1/admin/products` - Create new product
- `PUT /api/v1/admin/products/:id` - Update product
- `DELETE /api/v1/admin/products/:id` - Delete product
- `PUT /api/v1/admin/products/:id/photo` - Upload product photo

#### Orders
- `GET /api/v1/admin/orders` - Get all orders (with pagination, filtering, sorting)
- `GET /api/v1/admin/orders/:id` - Get single order
- `PUT /api/v1/admin/orders/:id/deliver` - Mark order as delivered
- `PUT /api/v1/admin/orders/:id/status` - Update order status

#### Dashboard
- `GET /api/v1/admin/dashboard-stats` - Get dashboard statistics
- `GET /api/v1/admin/orders/stats` - Get order statistics
- `GET /api/v1/admin/orders/sales` - Get sales statistics

## API Documentation

For detailed API documentation including request/response schemas, please refer to the Postman collection or OpenAPI/Swagger documentation (coming soon).

## Security

- All admin routes are protected with JWT authentication
- Role-based access control (RBAC) for admin-only endpoints
- Rate limiting to prevent abuse
- Input sanitization and validation
- Security headers with helmet
- XSS protection
- HTTP Parameter Pollution protection
- NoSQL injection protection

## Error Handling

The API returns appropriate HTTP status codes and JSON responses for different scenarios:

- 200: Success
- 201: Created
- 400: Bad Request
- 401: Unauthorized
- 403: Forbidden
- 404: Not Found
- 500: Internal Server Error

Example error response:
```json
{
  "success": false,
  "error": "Error message here"
}
```

## Rate Limiting

The API implements rate limiting to prevent abuse. By default, it allows 100 requests per 15 minutes per IP address.

## File Uploads

File uploads are supported for product images. The maximum file size is 1MB by default, and only image files are allowed (jpeg, jpg, png, gif, webp).

## Testing

To run tests:

```bash
npm test
```

To run tests with coverage:

```bash
npm run test:coverage
```

## Deployment

For production deployment, make sure to:

1. Set `NODE_ENV=production`
2. Update all environment variables with production values
3. Use a process manager like PM2
4. Set up proper logging
5. Enable HTTPS
6. Set up monitoring and alerts

## License

MIT

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
