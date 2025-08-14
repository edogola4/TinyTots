// jest.setup.js
process.env.NODE_ENV = 'test';

// Set test timeout
jest.setTimeout(30000);

// Mock console methods
const originalConsoleLog = console.log;
const originalConsoleError = console.error;

beforeAll(() => {
  // Suppress console output during tests
  console.log = jest.fn();
  console.error = jest.fn();
});

afterAll(() => {
  // Restore console methods
  console.log = originalConsoleLog;
  console.error = originalConsoleError;
});

// Global test utilities
global.sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));
