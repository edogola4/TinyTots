const request = require('supertest');
const { app } = require('./cleanTestApp');

// Test data
let orderId; // Declare orderId at the top level

const testProduct = {
  _id: 'prod123',
  name: 'Test Product',
  description: 'A test product',
  price: 29.99,
  category: 'Test',
  countInStock: 10
};

const testOrder = {
  orderItems: [
    {
      name: testProduct.name,
      qty: 1,
      image: '/images/sample.jpg',
      price: testProduct.price,
      product: testProduct._id
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
  totalPrice: 32.98
};

const paymentResult = {
  id: 'PAY-123',
  status: 'COMPLETED',
  update_time: new Date().toISOString(),
  email_address: 'test@example.com'
};

describe('Order Management', () => {
  const userToken = 'user-token-123';
  // orderId is now declared at the top level

  beforeAll(async () => {
    // Setup test database
    await global.setupTestDB();
  });

  afterAll(async () => {
    // Clean up test database
    await global.teardownTestDB();
  });

  describe('Create Order', () => {
    it('should create a new order', async () => {
      const res = await request(app)
        .post('/api/orders')
        .set('Authorization', `Bearer ${userToken}`)
        .send(testOrder);

      expect(res.statusCode).toEqual(201);
      expect(res.body.success).toBe(true);
      expect(res.body.data).toHaveProperty('_id');
      expect(res.body.data.orderItems[0].name).toBe(testProduct.name);
      
      // Save the order ID for subsequent tests
      if (res.body.data && res.body.data._id) {
        orderId = res.body.data._id;
      }
    });
  });

  describe('Get Order by ID', () => {
    it('should get order by ID', async () => {
      // Make sure we have a valid order ID
      if (!orderId) {
        const createRes = await request(app)
          .post('/api/orders')
          .set('Authorization', `Bearer ${userToken}`)
          .send(testOrder);
        orderId = createRes.body.data._id;
      }

      const res = await request(app)
        .get(`/api/orders/${orderId}`)
        .set('Authorization', `Bearer ${userToken}`);

      expect(res.statusCode).toEqual(200);
      expect(res.body.success).toBe(true);
      expect(res.body.data._id).toBe(orderId);
      expect(res.body.data.user).toBe('user123'); // From the mock auth
    });
  });

  describe('Update Order to Paid', () => {
    it('should update order to paid', async () => {
      // Make sure we have a valid order ID
      if (!orderId) {
        const createRes = await request(app)
          .post('/api/orders')
          .set('Authorization', `Bearer ${userToken}`)
          .send(testOrder);
        orderId = createRes.body.data._id;
      }

      const res = await request(app)
        .put(`/api/orders/${orderId}/pay`)
        .set('Authorization', `Bearer ${userToken}`)
        .send(paymentResult);

      expect(res.statusCode).toEqual(200);
      expect(res.body.success).toBe(true);
      expect(res.body.data.isPaid).toBe(true);
      expect(res.body.data.paymentResult.id).toBe(paymentResult.id);
    });
  });
});
