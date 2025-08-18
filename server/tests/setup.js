const mongoose = require('mongoose');

// Set test environment variables before any tests run
process.env.NODE_ENV = 'test';
process.env.JWT_SECRET = 'test-jwt-secret-key-for-testing-only';
process.env.JWT_EXPIRE = '30d';

// Global test utilities
global.sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

// Mock jsonwebtoken
jest.mock('jsonwebtoken', () => ({
  sign: jest.fn().mockReturnValue('mock-token'),
  verify: jest.fn().mockReturnValue({ 
    id: 'mock-user-id', 
    role: 'user',
    name: 'Test User',
    email: 'test@example.com'
  })
}));

// Setup and teardown for each test file
beforeEach(async () => {
  // Clear all test data before each test
  const collections = mongoose.connection.collections;
  for (const key in collections) {
    const collection = collections[key];
    try {
      await collection.deleteMany({});
    } catch (error) {
      console.warn(`Error clearing collection ${key}:`, error);
    }
  }
});

afterAll(async () => {
  // Global teardown is handled by globalSetup.js
});

// Increase Jest timeout to 60 seconds
jest.setTimeout(60000);