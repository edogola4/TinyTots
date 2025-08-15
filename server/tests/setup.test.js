const mongoose = require('mongoose');

// Increase Jest timeout for database operations
jest.setTimeout(30000);

describe('Test Setup', () => {
  beforeAll(async () => {
    // Only setup test database if not already connected
    if (mongoose.connection.readyState === 0) { // 0 = disconnected
      await global.setupTestDB();
    }
  });

  afterAll(async () => {
    // Only teardown if we're the ones who set it up
    if (mongoose.connection.readyState !== 0) {
      await global.teardownTestDB();
    }
  });

  it('should have mongoose available', () => {
    expect(mongoose).toBeDefined();
    expect(mongoose.connection).toBeDefined();
  });

  it('should have test environment variables set', () => {
    expect(process.env.NODE_ENV).toBe('test');
    expect(process.env.JWT_SECRET).toBeDefined();
    expect(process.env.JWT_SECRET).not.toBe('your-jwt-secret'); // Ensure it's not the default
  });

  it('should have test utilities available', () => {
    expect(global.sleep).toBeDefined();
    expect(global.setupTestDB).toBeDefined();
    expect(global.teardownTestDB).toBeDefined();
  });
});