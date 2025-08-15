const request = require('supertest');
const mongoose = require('mongoose');
const User = require('../src/models/User');
const Product = require('../src/models/Product');
const Order = require('../src/models/Order');
const app = require('./testApp');

// Admin test data
const adminUser = {
  name: 'Admin Test',
  email: 'admin.test@example.com',
  password: 'Admin@123',
  role: 'admin'
};

// Regular user for testing
const regularUser = {
  name: 'Regular User',
  email: 'regular@example.com',
  password: 'User@123',
  role: 'user'
};

describe('Admin Operations', () => {
  let adminToken;
  let regularToken;
  let testProductId;
  let testOrderId;
  let adminUserId;
  let regularUserId;

  beforeAll(async () => {
    // Setup test database
    await global.setupTestDB();
    
    // Clear test data
    await User.deleteMany({});
    await Product.deleteMany({});
    await Order.deleteMany({});

    // Set up mock user IDs
    adminUserId = 'admin123';
    regularUserId = 'user123';

    // For testing, we'll use the mock admin token directly
    adminToken = 'admin-token-123';
    console.log('Using mock admin token for testing');

    // For testing, we'll use the mock user token directly
    regularToken = 'user-token-123';
    console.log('Using mock user token for testing');
  });

  afterAll(async () => {
    // Clean up test database
    await global.teardownTestDB();
  });

  describe('Admin Token Verification', () => {
    it('should have a valid admin token', () => {
      expect(adminToken).toBeDefined();
      expect(typeof adminToken).toBe('string');
      
      // Log the token prefix for debugging
      console.log('Admin token starts with:', adminToken.substring(0, 20) + '...');
    });
  });

  describe('Product Management', () => {
    it('should allow admin to create a product', async () => {
      const productData = {
        name: 'Test Product',
        description: 'Test Description',
        price: 99.99,
        category: 'Test Category',
        countInStock: 10
      };

      const res = await request(app)
        .post('/api/v1/admin/products')
        .set('Authorization', `Bearer ${adminToken}`)
        .send(productData);

      expect(res.statusCode).toEqual(201);
      expect(res.body.success).toBe(true);
      expect(res.body.data.name).toBe(productData.name);
      
      testProductId = res.body.data._id;
    });

    it('should not allow non-admin to create a product', async () => {
      const res = await request(app)
        .post('/api/v1/admin/products')
        .set('Authorization', `Bearer ${regularToken}`)
        .send({
          name: 'Unauthorized Product',
          price: 49.99
        });

      expect(res.statusCode).toEqual(403);
    });
  });

  describe('User Management', () => {
    it('should allow admin to get all users', async () => {
      const res = await request(app)
        .get('/api/v1/admin/users')
        .set('Authorization', `Bearer ${adminToken}`);

      expect(res.statusCode).toEqual(200);
      expect(res.body.success).toBe(true);
      expect(Array.isArray(res.body.data)).toBe(true);
      expect(res.body.data.length).toBeGreaterThanOrEqual(2);
    });

    it('should not allow non-admin to get all users', async () => {
      const res = await request(app)
        .get('/api/v1/admin/users')
        .set('Authorization', `Bearer ${regularToken}`);

      expect(res.statusCode).toEqual(403);
    });
  });

  describe('Order Management', () => {
    it('should allow admin to get all orders', async () => {
      const res = await request(app)
        .get('/api/v1/admin/orders')
        .set('Authorization', `Bearer ${adminToken}`);

      expect(res.statusCode).toEqual(200);
      expect(res.body.success).toBe(true);
      expect(Array.isArray(res.body.data)).toBe(true);
    });
  });
});
