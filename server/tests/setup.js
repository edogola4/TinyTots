// This file runs before all tests
process.env.NODE_ENV = 'test';

// Increase timeout for tests with file uploads
jest.setTimeout(30000);

// Mock console methods to keep test output clean
const originalConsoleLog = console.log;
const originalConsoleError = console.error;

// Setup test hooks
beforeAll(() => {
  // Suppress console output during tests
  console.log = jest.fn();
  console.error = jest.fn();
});

afterAll(() => {
  // Restore original console methods
  console.log = originalConsoleLog;
  console.error = originalConsoleError;
});

// Add test utilities
global.sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

// Test database utilities
global.setupTestDB = async () => {
  // Add any test database setup code here
};

global.teardownTestDB = async () => {
  // Add any test database cleanup code here
};
