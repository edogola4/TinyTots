const mongoose = require('mongoose');
const request = require('supertest');
const app = require('../src/app');
const User = require('../src/models/User');
const Product = require('../src/models/Product');
const Order = require('../src/models/Order');

// Test data
const adminUser = {
  name: 'Admin User',
  email: 'admin@test.com',
  password: 'password123',
  role: 'admin'
};

const testUser = {
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

// Helper function to get auth token
const getAuthToken = async (userData) => {
  const res = await request(app)
    .post('/api/v1/auth/register')
    .send(userData);
  return res.body.token;
};

describe('Admin API Tests', () => {
  let adminToken;
  let testUserToken;
  let testUserId;
  let testProductId;

  beforeAll(async () => {
    // Clear any existing test data
    await User.deleteMany({});
    await Product.deleteMany({});
    await Order.deleteMany({});
    
    // Create admin user and get token
    adminToken = await getAuthToken(adminUser);
    
    // Create a test user and get token
    const userRes = await request(app)
      .post('/api/v1/auth/register')
      .send(testUser);
      
    testUserId = userRes.body._id;
    testUserToken = userRes.body.token;
  });

  afterAll(async () => {
    // Clean up test data
    await User.deleteMany({});
    await Product.deleteMany({});
    await Order.deleteMany({});
    
    // Close the database connection
    await mongoose.connection.close();
  });

  describe('User Management', () => {
    test('should get all users (admin only)', async () => {
      const res = await request(app)
        .get('/api/v1/admin/users')
        .set('Authorization', `Bearer ${adminToken}`);
      
      expect(res.statusCode).toBe(200);
      expect(res.body).toHaveProperty('success', true);
      expect(Array.isArray(res.body.data)).toBe(true);
    });
    
    test('should prevent non-admin from accessing all users', async () => {
      const res = await request(app)
        .get('/api/v1/admin/users')
        .set('Authorization', `Bearer ${testUserToken}`);
      
      expect(res.statusCode).toBe(403);
      expect(res.body).toHaveProperty('success', false);
    });
    
    test('should get a single user by ID (admin only)', async () => {
      const res = await request(app)
        .get(`/api/v1/admin/users/${testUserId}`)
        .set('Authorization', `Bearer ${adminToken}`);
      
      expect(res.statusCode).toBe(200);
      expect(res.body).toHaveProperty('success', true);
      expect(res.body.data).toHaveProperty('_id', testUserId);
    });
  });
  
  describe('Product Management', () => {
    test('should allow admin to create a product', async () => {
      const res = await request(app)
        .post('/api/v1/admin/products')
        .set('Authorization', `Bearer ${adminToken}`)
        .send(testProduct);
      
      expect(res.statusCode).toBe(201);
      expect(res.body).toHaveProperty('success', true);
      expect(res.body.data).toHaveProperty('_id');
      expect(res.body.data.name).toBe(testProduct.name);
      
      testProductId = res.body.data._id;
    });
    
    test('should prevent non-admin from creating a product', async () => {
      const res = await request(app)
        .post('/api/v1/admin/products')
        .set('Authorization', `Bearer ${testUserToken}`)
        .send(testProduct);
      
      expect(res.statusCode).toBe(403);
      expect(res.body).toHaveProperty('success', false);
    });
    
    test('should allow admin to update a product', async () => {
      const updatedProduct = { ...testProduct, name: 'Updated Test Product' };
      const res = await request(app)
        .put(`/api/v1/admin/products/${testProductId}`)
        .set('Authorization', `Bearer ${adminToken}`)
        .send(updatedProduct);
      
      expect(res.statusCode).toBe(200);
      expect(res.body).toHaveProperty('success', true);
      expect(res.body.data.name).toBe('Updated Test Product');
    });
  });
});

// Connect to the test database before running tests
beforeAll(async () => {
  // Connect to the test database
  await mongoose.connect(process.env.MONGODB_URI + '_test', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  // Clear the test database
  await User.deleteMany({});
  await Product.deleteMany({});
  await Order.deleteMany({});

  // Create admin and test users
  await request(app)
    .post('/api/v1/auth/register')
    .send(adminUser);

  await request(app)
    .post('/api/v1/auth/register')
    .send(testUser);

  // Login to get tokens
  const adminRes = await request(app)
    .post('/api/v1/auth/login')
    .send({
      email: adminUser.email,
      password: adminUser.password
    });
  
  const testRes = await request(app)
    .post('/api/v1/auth/login')
    .send({
      email: testUser.email,
      password: testUser.password
    });

  adminToken = adminRes.body.token;
  testToken = testRes.body.token;
});

// Close the database connection after all tests are done
afterAll(async () => {
  await mongoose.connection.dropDatabase();
  await mongoose.connection.close();
});

describe('Admin API', () => {
  // Test admin user management
  describe('User Management', () => {
    test('should get all users', async () => {
      const res = await request(app)
        .get('/api/v1/admin/users')
        .set('Authorization', `Bearer ${adminToken}`);
      
      expect(res.statusCode).toBe(200);
      expect(res.body.success).toBe(true);
      expect(Array.isArray(res.body.data)).toBe(true);
      expect(res.body.data.length).toBe(2); // Admin and test user
    });

    test('should not allow non-admin to get all users', async () => {
      const res = await request(app)
        .get('/api/v1/admin/users')
        .set('Authorization', `Bearer ${testToken}`);
      
      expect(res.statusCode).toBe(403);
    });
  });

  // Test product management
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
        .put(`/api/v1/admin/products/${productId}`)
        .set('Authorization', `Bearer ${adminToken}`)
        .send(updatedProduct);
      
      expect(res.statusCode).toBe(200);
      expect(res.body.success).toBe(true);
      expect(res.body.data.price).toBe(updatedProduct.price);
    });
  });

  // Test order management
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

  // Test dashboard stats
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
