const express = require('express');
const cors = require('cors');

// Create test app
const app = express();

// Basic middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

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

// Mock admin authorization
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
app.get('/api/health', (req, res) => {
  res.status(200).json({ status: 'ok' });
});

// Admin dashboard route
app.get('/api/admin/dashboard', mockAuth, mockAdminAuth, (req, res) => {
  res.status(200).json({
    success: true,
    data: { message: 'Admin dashboard access granted' }
  });
});

// Admin API routes with auth
app.use('/api/v1/admin/*', mockAuth, mockAdminAuth);

// Users routes
app.get('/api/v1/admin/users', (req, res) => {
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

app.get('/api/v1/admin/users/:id', (req, res) => {
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

// Products routes
app.post('/api/v1/admin/products', (req, res) => {
  const productData = req.body;
  
  res.status(201).json({
    success: true,
    data: {
      _id: 'product123',
      ...productData
    }
  });
});

app.put('/api/v1/admin/products/:id', (req, res) => {
  const { id } = req.params;
  const productData = req.body;
  
  res.status(200).json({
    success: true,
    data: {
      _id: id,
      ...productData
    }
  });
});

// Orders routes
app.get('/api/v1/admin/orders', (req, res) => {
  res.status(200).json({
    success: true,
    data: [
      {
        _id: 'order123',
        user: 'user123',
        products: ['product123'],
        total: 99.99,
        status: 'pending'
      }
    ]
  });
});

// Dashboard stats route
app.get('/api/v1/admin/dashboard-stats', (req, res) => {
  res.status(200).json({
    success: true,
    data: {
      totalUsers: 2,
      totalProducts: 1,
      totalOrders: 1,
      totalRevenue: 99.99
    }
  });
});

// Auth routes for registration/login
app.post('/api/v1/auth/register', (req, res) => {
  const userData = req.body;
  
  res.status(201).json({
    success: true,
    token: userData.role === 'admin' ? 'admin-token-123' : 'user-token-123',
    _id: userData.role === 'admin' ? 'admin123' : 'user123',
    data: {
      _id: userData.role === 'admin' ? 'admin123' : 'user123',
      ...userData
    }
  });
});

// 404 handler
app.all('*', (req, res) => {
  res.status(404).json({
    success: false,
    message: `Route ${req.originalUrl} not found`
  });
});

module.exports = app;