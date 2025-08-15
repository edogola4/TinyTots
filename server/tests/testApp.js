// 1. First, remove the entire content of testApp.js

// 2. Then, replace it with this clean version:
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const helmet = require('helmet');
const mongoSanitize = require('express-mongo-sanitize');
const xss = require('xss-clean');
const hpp = require('hpp');
const cookieParser = require('cookie-parser');

// Create a new Express application
const app = express();

// Body parser, reading data from body into req.body
app.use(express.json({ limit: '10kb' }));
app.use(express.urlencoded({ extended: true, limit: '10kb' }));
app.use(cookieParser());

// Enable CORS
app.use(cors());

// Development logging
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// Set security HTTP headers
app.use(helmet());

// Data sanitization against NoSQL query injection
app.use(mongoSanitize());

// Data sanitization against XSS
app.use(xss());

// Prevent parameter pollution
app.use(hpp({
  whitelist: ['duration', 'ratingsQuantity', 'ratingsAverage', 'maxGroupSize', 'difficulty', 'price']
}));

// Test middleware
app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});

// Mock auth middleware
const mockAuth = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  
  if (!token) {
    return res.status(401).json({ 
      success: false, 
      message: 'No token provided' 
    });
  }
  
  if (token === 'admin-token-123') {
    req.user = { id: 'admin123', role: 'admin' };
  } else if (token === 'user-token-123') {
    req.user = { id: 'user123', role: 'user' };
  } else {
    return res.status(403).json({ 
      success: false, 
      message: 'Invalid token' 
    });
  }
  
  next();
};

// Mock admin authorization middleware
const mockAdminAuth = (req, res, next) => {
  if (req.user?.role !== 'admin') {
    return res.status(403).json({
      success: false,
      message: 'Admin access required'
    });
  }
  next();
};

// Health check route
app.get('/api/v1/health', (req, res) => {
  res.status(200).json({ status: 'ok' });
});

// Dashboard stats route
app.get('/api/v1/admin/dashboard', mockAuth, mockAdminAuth, (req, res) => {
  res.status(200).json({
    success: true,
    data: {
      totalUsers: 2,
      totalProducts: 10,
      totalOrders: 5,
      totalRevenue: 999.99
    }
  });
});

// Users
app.get('/api/v1/admin/users', mockAuth, mockAdminAuth, (req, res) => {
  res.status(200).json({
    success: true,
    data: [
      {
        _id: 'admin123',
        name: 'Admin User',
        email: 'admin@test.com',
        role: 'admin'
      },
      {
        _id: 'user123',
        name: 'Test User',
        email: 'test@test.com',
        role: 'user'
      }
    ]
  });
});

// Products
app.post('/api/v1/admin/products', mockAuth, mockAdminAuth, (req, res) => {
  const product = {
    _id: 'prod' + Math.floor(Math.random() * 1000),
    ...req.body,
    createdAt: new Date(),
    updatedAt: new Date()
  };
  
  res.status(201).json({
    success: true,
    data: product
  });
});

// Orders
app.get('/api/v1/admin/orders', mockAuth, mockAdminAuth, (req, res) => {
  res.status(200).json({
    success: true,
    data: [
      {
        _id: 'order123',
        user: 'user123',
        items: [],
        status: 'processing',
        total: 99.99,
        createdAt: new Date()
      }
    ]
  });
});

// Single user
app.get('/api/v1/admin/users/:id', mockAuth, mockAdminAuth, (req, res) => {
  const { id } = req.params;
  
  const users = {
    'admin123': {
      _id: 'admin123',
      name: 'Admin User',
      email: 'admin@test.com',
      role: 'admin'
    },
    'user123': {
      _id: 'user123',
      name: 'Test User',
      email: 'test@test.com',
      role: 'user'
    }
  };
  
  const user = users[id];
  if (!user) {
    return res.status(404).json({
      success: false,
      message: 'User not found'
    });
  }
  
  res.status(200).json({
    success: true,
    data: user
  });
});

// Order routes
app.post('/api/v1/orders', mockAuth, (req, res) => {
  const newOrder = {
    _id: 'order' + Math.floor(Math.random() * 1000),
    user: req.user.id,
    ...req.body,
    status: 'pending',
    createdAt: new Date(),
    updatedAt: new Date()
  };
  
  res.status(201).json({
    success: true,
    data: newOrder
  });
});

app.get('/api/v1/orders/:id', mockAuth, (req, res) => {
  const order = {
    _id: req.params.id,
    user: req.user.id,
    orderItems: [
      {
        name: 'Test Product',
        qty: 1,
        price: 29.99,
        product: 'prod123'
      }
    ],
    shippingAddress: {
      address: '123 Test St',
      city: 'Test City',
      postalCode: '12345',
      country: 'Test Country'
    },
    paymentMethod: 'PayPal',
    itemsPrice: 29.99,
    taxPrice: 2.99,
    shippingPrice: 0,
    totalPrice: 32.98,
    isPaid: false,
    isDelivered: false,
    createdAt: new Date()
  };
  
  // Check if the order belongs to the user or if user is admin
  if (order.user !== req.user.id && req.user.role !== 'admin') {
    return res.status(403).json({
      success: false,
      message: 'Not authorized to access this order'
    });
  }
  
  res.status(200).json({
    success: true,
    data: order
  });
});

app.put('/api/v1/orders/:id/pay', mockAuth, (req, res) => {
  const order = {
    _id: req.params.id,
    user: req.user.id,
    orderItems: [
      {
        name: 'Test Product',
        qty: 1,
        price: 29.99,
        product: 'prod123'
      }
    ],
    shippingAddress: {
      address: '123 Test St',
      city: 'Test City',
      postalCode: '12345',
      country: 'Test Country'
    },
    paymentMethod: 'PayPal',
    itemsPrice: 29.99,
    taxPrice: 2.99,
    shippingPrice: 0,
    totalPrice: 32.98,
    isPaid: true,
    paidAt: new Date(),
    paymentResult: req.body,
    isDelivered: false,
    createdAt: new Date(),
    updatedAt: new Date()
  };
  
  // Check if the order belongs to the user or if user is admin
  if (order.user !== req.user.id && req.user.role !== 'admin') {
    return res.status(403).json({
      success: false,
      message: 'Not authorized to update this order'
    });
  }
  
  res.status(200).json({
    success: true,
    data: order
  });
});

// Auth routes
app.post('/api/v1/auth/register', (req, res) => {
  const { name, email, password, role } = req.body;
  
  // Simple validation
  if (!name || !email || !password) {
    return res.status(400).json({
      success: false,
      message: 'Please provide name, email, and password'
    });
  }
  
  // Mock user creation
  const newUser = {
    _id: role === 'admin' ? 'admin123' : 'user' + Math.floor(Math.random() * 1000),
    name,
    email,
    role: role || 'user',
    createdAt: new Date()
  };
  
  // Generate token
  const token = role === 'admin' ? 'admin-token-123' : 'user-token-123';
  
  res.status(201).json({
    success: true,
    token,
    user: newUser
  });
});

app.post('/api/v1/auth/login', (req, res) => {
  const { email, password } = req.body;
  
  // Mock validation
  if (!email || !password) {
    return res.status(400).json({
      success: false,
      message: 'Please provide email and password'
    });
  }
  
  // Mock user lookup
  let user;
  if (email === 'admin@test.com') {
    user = {
      _id: 'admin123',
      name: 'Admin User',
      email: 'admin@test.com',
      role: 'admin'
    };
  } else if (email === 'test@test.com') {
    user = {
      _id: 'user123',
      name: 'Test User',
      email: 'test@test.com',
      role: 'user'
    };
  } else {
    return res.status(401).json({
      success: false,
      message: 'Invalid credentials'
    });
  }
  
  // Mock token generation
  const token = user.role === 'admin' ? 'admin-token-123' : 'user-token-123';
  
  res.status(200).json({
    success: true,
    token,
    user
  });
});

// 404 handler
app.use((req, res, next) => {
  res.status(404).json({
    success: false,
    message: `Can't find ${req.originalUrl} on this server!`
  });
});

// Global error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    success: false,
    message: 'Something went wrong!',
    error: process.env.NODE_ENV === 'development' ? err.message : {}
  });
});

// Export the app for testing
module.exports = app;