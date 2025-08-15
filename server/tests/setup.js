const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');

// Create a new in-memory database for testing
let mongoServer;

// Set test environment variables before any tests run
process.env.NODE_ENV = 'test';
process.env.JWT_SECRET = 'test-jwt-secret-key-for-testing-only';
process.env.JWT_EXPIRE = '30d';

// Global test utilities
global.sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

// Keep track of whether we've set up the test DB
let isTestDBSetup = false;

global.setupTestDB = async () => {
  if (isTestDBSetup) {
    return mongoose.connection;
  }

  try {
    // Create a new in-memory MongoDB server
    mongoServer = await MongoMemoryServer.create();
    const uri = mongoServer.getUri();
    
    // Set the test database URI
    process.env.MONGODB_URI = uri;
    
    // Connect to the in-memory database
    await mongoose.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    
    console.log('Test DB setup');
    isTestDBSetup = true;
    return mongoose.connection;
  } catch (error) {
    console.error('Error setting up test DB:', error);
    throw error;
  }
};

global.teardownTestDB = async () => {
  if (!isTestDBSetup) {
    return;
  }

  try {
    // Clear all test data after tests
    const collections = mongoose.connection.collections;
    for (const key in collections) {
      const collection = collections[key];
      try {
        await collection.deleteMany({});
      } catch (error) {
        console.warn(`Error clearing collection ${key}:`, error);
      }
    }
    
    // Close the connection and stop the in-memory server
    await mongoose.connection.dropDatabase();
    await mongoose.connection.close();
    await mongoServer.stop();
    
    isTestDBSetup = false;
    console.log('Test DB teardown');
  } catch (error) {
    console.error('Error tearing down test DB:', error);
    throw error;
  }
};

// Mock jsonwebtoken
jest.mock('jsonwebtoken', () => ({
  sign: jest.fn().mockReturnValue('mock-token'),
  verify: jest.fn().mockReturnValue({ id: 'mock-user-id', role: 'user' })
}));



// Increase Jest timeout
jest.setTimeout(30000);

// Setup and teardown
beforeAll(async () => {
  await global.setupTestDB();
});

afterAll(async () => {
  await global.teardownTestDB();
});