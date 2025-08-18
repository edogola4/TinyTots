module.exports = {
  // Test environment
  testEnvironment: 'node',
  
  // Global setup and teardown
  globalSetup: '<rootDir>/tests/globalSetup.js',
  setupFilesAfterEnv: ['<rootDir>/tests/setup.js'],
  
  // Test file patterns
  testMatch: ['**/tests/**/*.test.js'],
  
  // Test timeout (60 seconds)
  testTimeout: 60000,
  
  // Detect open handles and force exit
  detectOpenHandles: true,
  forceExit: true,
  
  // Run tests in band (sequentially) to avoid port conflicts
  maxWorkers: 1,
  
  // Coverage settings
  collectCoverage: true,
  collectCoverageFrom: [
    'src/**/*.js',
    '!**/node_modules/**',
    '!**/vendor/**',
    '!**/tests/**',
    '!**/coverage/**',
    '!jest.config.js',
    '!server.js',
    '!src/app.js'
  ],
  coverageDirectory: 'coverage',
  coverageReporters: ['text', 'lcov'],
  
  // Module name mapper for imports
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
    '^@tests/(.*)$': '<rootDir>/tests/$1'
  },
  
  // Transform settings
  transform: {
    '^.+\\.js$': 'babel-jest'
  }
};
