// This file runs after the test environment is set up
const mongoose = require('mongoose');

// Test database connection URL
const TEST_MONGODB_URI = process.env.MONGODB_URI + '_test';

// Connect to the test database before any tests run
beforeAll(async () => {
  try {
    await mongoose.connect(TEST_MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false
    });
  } catch (error) {
    console.error('Error connecting to test database:', error);
    process.exit(1);
  }
});

// Clear all test data after each test
afterEach(async () => {
  try {
    const collections = Object.keys(mongoose.connection.collections);
    
    for (const collectionName of collections) {
      const collection = mongoose.connection.collections[collectionName];
      try {
        await collection.deleteMany({});
      } catch (error) {
        // Collection might not exist, ignore the error
        if (error.message !== 'ns not found') {
          console.error('Error cleaning up test data:', error);
          throw error;
        }
      }
    }
  } catch (error) {
    console.error('Error in afterEach hook:', error);
    throw error;
  }
});

// Close the database connection after all tests are done
afterAll(async () => {
  try {
    await mongoose.connection.dropDatabase();
    await mongoose.connection.close();
  } catch (error) {
    console.error('Error closing database connection:', error);
    throw error;
  }
});
