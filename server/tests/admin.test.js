const request = require('supertest');
const app = require('./testApp');
const mongoose = require('mongoose');

// Import models
const User = require('../src/models/User');
const Product = require('../src/models/Product');
const Order = require('../src/models/Order');

// Clear all test data before each test
beforeEach(async () => {
  // Clear all test data
  const collections = mongoose.connection.collections;
  for (const key in collections) {
    const collection = collections[key];
    await collection.deleteMany({});
  }
});

// Test data
const adminUser = {
  _id: 'admin123',
  name: 'Admin User',
  email: 'admin@test.com',
  password: 'password123',
  role: 'admin'
};

const testUser = {
  _id: 'user123',
  name: 'Test User',
  email: 'test@test.com',
  password: 'password123',
  role: 'user'
};

const testProduct = {
  name: 'Test Product',
  description: 'This is a test product',
  price: 99.99,
  category: 'Test',
  countInStock: 10
};

// Global test variables
let adminToken;
let testToken;
let productId;

describe('Admin API Tests', () => {
  beforeAll(async () => {
    // Set up test data
    adminToken = 'admin-token-123';
    testToken = 'user-token-123';
    
    // Mock implementations
    User.find = jest.fn().mockResolvedValue([adminUser, testUser]);
    User.findById = jest.fn().mockImplementation((id) => {
      if (id === 'admin123') return Promise.resolve(adminUser);
      if (id === 'user123') return Promise.resolve(testUser);
      return Promise.resolve(null);
    });
    
    Product.create = jest.fn().mockImplementation((data) => 
      Promise.resolve({ _id: 'product123', ...data })
    );
    
    Product.findByIdAndUpdate = jest.fn().mockImplementation((id, data) => 
      Promise.resolve({ _id: id, ...data })
    );
    
    Order.find = jest.fn().mockResolvedValue([
      { _id: 'order123', user: 'user123', total: 99.99 }
    ]);
  });

  describe('User Management', () => {
    test('should get all users (admin only)', async () => {
      const res = await request(app)
        .get('/api/v1/admin/users')
        .set('Authorization', `Bearer ${adminToken}`);
      
      expect(res.statusCode).toBe(200);
      expect(res.body.success).toBe(true);
      expect(Array.isArray(res.body.data)).toBe(true);
      expect(res.body.data.length).toBe(2);
    });

    test('should prevent non-admin from accessing all users', async () => {
      const res = await request(app)
        .get('/api/v1/admin/users')
        .set('Authorization', `Bearer ${testToken}`);
      
      expect(res.statusCode).toBe(403);
      expect(res.body.success).toBe(false);
    });

    test('should get a single user by ID (admin only)', async () => {
      const res = await request(app)
        .get('/api/v1/admin/users/user123')
        .set('Authorization', `Bearer ${adminToken}`);
      
      expect(res.statusCode).toBe(200);
      expect(res.body.success).toBe(true);
      expect(res.body.data._id).toBe('user123');
    });
  });

  describe('Product Management', () => {
    test('should allow admin to create a product', async () => {
      const res = await request(app)
        .post('/api/v1/admin/products')
        .set('Authorization', `Bearer ${adminToken}`)
        .send(testProduct);
      
      expect(res.statusCode).toBe(201);
      expect(res.body.success).toBe(true);
      expect(res.body.data.name).toBe(testProduct.name);
      expect(res.body.data.price).toBe(testProduct.price);
      
      // Store the product ID for later tests
      productId = res.body.data._id;
    });

    test('should prevent non-admin from creating a product', async () => {
      const res = await request(app)
        .post('/api/v1/admin/products')
        .set('Authorization', `Bearer ${testToken}`)
        .send(testProduct);
      
      expect(res.statusCode).toBe(403);
      expect(res.body.success).toBe(false);
    });

    test('should allow admin to update a product', async () => {
      // Use the productId from the creation test
      const updatedProduct = { ...testProduct, price: 129.99 };
      const res = await request(app)
        .put(`/api/v1/admin/products/${productId || 'product123'}`)
        .set('Authorization', `Bearer ${adminToken}`)
        .send(updatedProduct);
      
      expect(res.statusCode).toBe(200);
      expect(res.body.success).toBe(true);
      expect(res.body.data.price).toBe(updatedProduct.price);
    });
  });

  describe('Order Management', () => {
    test('should get all orders', async () => {
      const res = await request(app)
        .get('/api/v1/admin/orders')
        .set('Authorization', `Bearer ${adminToken}`);
      
      expect(res.statusCode).toBe(200);
      expect(res.body.success).toBe(true);
      expect(Array.isArray(res.body.data)).toBe(true);
    });
  });

  describe('Dashboard', () => {
    test('should get dashboard statistics', async () => {
      const res = await request(app)
        .get('/api/v1/admin/dashboard-stats')
        .set('Authorization', `Bearer ${adminToken}`);
      
      expect(res.statusCode).toBe(200);
      expect(res.body.success).toBe(true);
      expect(res.body.data).toHaveProperty('totalUsers');
      expect(res.body.data).toHaveProperty('totalProducts');
      expect(res.body.data).toHaveProperty('totalOrders');
      expect(res.body.data).toHaveProperty('totalRevenue');
    });
  });
});

describe('Admin API', () => {
  beforeEach(() => {
    // Reset tokens for each test
    adminToken = 'admin-token-123';
    testToken = 'user-token-123';
  });

  describe('Health Check', () => {
    it('should return 200 and status ok', async () => {
      const res = await request(app).get('/api/health');
      expect(res.statusCode).toBe(200);
      expect(res.body).toHaveProperty('status', 'ok');
    });
  });

  describe('Admin Dashboard', () => {
    it('should allow access with admin token', async () => {
      const res = await request(app)
        .get('/api/admin/dashboard')
        .set('Authorization', `Bearer ${adminToken}`);
      
      expect(res.statusCode).toBe(200);
      expect(res.body.success).toBe(true);
    });

    it('should deny access with user token', async () => {
      const res = await request(app)
        .get('/api/admin/dashboard')
        .set('Authorization', `Bearer ${testToken}`);
      
      expect(res.statusCode).toBe(403);
      expect(res.body.success).toBe(false);
    });

    it('should deny access without token', async () => {
      const res = await request(app).get('/api/admin/dashboard');
      expect(res.statusCode).toBe(401);
      expect(res.body.success).toBe(false);
    });
  });

  describe('User Management', () => {
    test('should get all users', async () => {
      const res = await request(app)
        .get('/api/v1/admin/users')
        .set('Authorization', `Bearer ${adminToken}`);
      
      expect(res.statusCode).toBe(200);
      expect(res.body.success).toBe(true);
      expect(Array.isArray(res.body.data)).toBe(true);
      expect(res.body.data.length).toBe(2);
    });

    test('should not allow non-admin to get all users', async () => {
      const res = await request(app)
        .get('/api/v1/admin/users')
        .set('Authorization', `Bearer ${testToken}`);
      
      expect(res.statusCode).toBe(403);
    });
  });

  describe('Product Management', () => {
    test('should create a new product', async () => {
      const res = await request(app)
        .post('/api/v1/admin/products')
        .set('Authorization', `Bearer ${adminToken}`)
        .send(testProduct);
      
      expect(res.statusCode).toBe(201);
      expect(res.body.success).toBe(true);
      expect(res.body.data.name).toBe(testProduct.name);
      expect(res.body.data.price).toBe(testProduct.price);
      
      productId = res.body.data._id;
    });

    test('should update a product', async () => {
      const updatedProduct = { ...testProduct, price: 129.99 };
      const res = await request(app)
        .put(`/api/v1/admin/products/${productId || 'product123'}`)
        .set('Authorization', `Bearer ${adminToken}`)
        .send(updatedProduct);
      
      expect(res.statusCode).toBe(200);
      expect(res.body.success).toBe(true);
      expect(res.body.data.price).toBe(updatedProduct.price);
    });
  });
});