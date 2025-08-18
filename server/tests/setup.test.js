const mongoose = require('mongoose');

// Set a longer timeout for tests
jest.setTimeout(120000); // 2 minutes

describe('Basic Test Setup', () => {
  it('should have test environment variables', () => {
    expect(process.env.NODE_ENV).toBe('test');
    expect(process.env.JWT_SECRET).toBeDefined();
  });

  it('should have mongoose available', () => {
    expect(mongoose).toBeDefined();
  });
});