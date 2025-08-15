const express = require('express');
const cors = require('cors');
const path = require('path');
const morgan = require('morgan');
const helmet = require('helmet');
const mongoSanitize = require('express-mongo-sanitize');
const xss = require('xss-clean');
const hpp = require('hpp');
const cookieParser = require('cookie-parser');

// Create a new Express application
const createTestApp = () => {
  const app = express();

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

  // Set security HTTP headers
  app.use(helmet());

  // Development logging
  if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
  }

  // Body parser, reading data from body into req.body
  app.use(express.json({ limit: '10kb' }));
  app.use(express.urlencoded({ extended: true, limit: '10kb' }));
  app.use(cookieParser());

  // Data sanitization against NoSQL query injection
  app.use(mongoSanitize());

  // Data sanitization against XSS
  app.use(xss());

  // Prevent parameter pollution
  app.use(hpp({
    whitelist: [
      'duration', 'ratingsQuantity', 'ratingsAverage', 'maxGroupSize', 'difficulty', 'price'
    ]
  }));

  // Test middleware
  app.use((req, res, next) => {
    req.requestTime = new Date().toISOString();
    next();
  });

  // Health check route
  app.get('/api/health', (req, res) => {
    res.status(200).json({ status: 'ok' });
  });

  // Mock API routes
  
  // Users
  app.get('/api/admin/users', mockAuth, mockAdminAuth, (req, res) => {
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
  app.post('/api/admin/products', mockAuth, mockAdminAuth, (req, res) => {
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
  app.get('/api/admin/orders', mockAuth, mockAdminAuth, (req, res) => {
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
  app.get('/api/admin/users/:id', mockAuth, mockAdminAuth, (req, res) => {
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
  app.post('/api/orders', mockAuth, (req, res) => {
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

  app.get('/api/orders/:id', mockAuth, (req, res) => {
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

  app.put('/api/orders/:id/pay', mockAuth, (req, res) => {
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

  return { app, mockAuth, mockAdminAuth };
};

// Create and export the test app instance
const { app, mockAuth, mockAdminAuth } = createTestApp();

// Export the app and middleware for testing
module.exports = {
  app,
  mockAuth,
  mockAdminAuth
};
