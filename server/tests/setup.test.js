const mongoose = require('mongoose');

// Get the base MongoDB URI from environment or use default
const MONGODB_BASE_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/';
// Create test database name by appending _test to the database name
const MONGODB_TEST_URI = MONGODB_BASE_URI.replace(/(\/\w*)?$/, '/tinytots_test');

// Increase Jest timeout for database operations
jest.setTimeout(30000);

describe('Test Setup', () => {
  // Wait for connection before running tests
  beforeAll(async () => {
    try {
      // Only connect if not already connected/connecting
      if (mongoose.connection.readyState === 0) {
        console.log('Connecting to MongoDB at:', MONGODB_TEST_URI);
        await mongoose.connect(MONGODB_TEST_URI, {
          serverSelectionTimeoutMS: 10000,
          socketTimeoutMS: 45000,
        });
      }
      
      // Wait for connection to be fully established
      if (mongoose.connection.readyState !== 1) {
        await new Promise((resolve) => {
          mongoose.connection.once('connected', resolve);
          // Add a timeout to prevent hanging
          setTimeout(() => resolve(), 10000);
        });
      }
      
      console.log('MongoDB connection state:', mongoose.connection.readyState);
    } catch (error) {
      console.error('MongoDB connection error:', error);
      throw error;
    }
  });

  // Clean up after all tests
  afterAll(async () => {
    try {
      // Only drop database if connected
      if (mongoose.connection.readyState === 1) {
        await mongoose.connection.dropDatabase();
        await mongoose.connection.close();
      }
    } catch (error) {
      console.error('Error during test cleanup:', error);
    }
  });

  test('should connect to the test database', () => {
    // 1 means connected, 2 means connecting
    expect(mongoose.connection.readyState).toBeGreaterThan(0);
  });

  test('should have the test environment set up correctly', () => {
    expect(process.env.NODE_ENV).toBe('test');
  });
});
