const { MongoMemoryServer } = require('mongodb-memory-server');
const mongoose = require('mongoose');
const fs = require('fs');
const path = require('path');

let mongoServer;

// Create a temporary directory for MongoDB data
const dbPath = path.join(process.cwd(), '.tmp', 'mongodb-data');

// Ensure the directory exists
if (!fs.existsSync(dbPath)) {
  fs.mkdirSync(dbPath, { recursive: true });
}

module.exports = async () => {
  try {
    console.log('Starting MongoDB Memory Server...');
    
    // Configure MongoDB Memory Server with simpler settings
    mongoServer = await MongoMemoryServer.create({
      instance: {
        dbPath,
        storageEngine: 'wiredTiger',
        port: 27017,
      },
      binary: {
        version: '4.4.1', // Use an older, more stable version
      },
      autoStart: true,
    });

    const uri = mongoServer.getUri();
    console.log('MongoDB Memory Server URI:', uri);
    
    // Set the connection URI for tests
    process.env.MONGODB_URI = uri;
    
    // Connect to the in-memory database
    await mongoose.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      serverSelectionTimeoutMS: 30000, // 30 seconds
      socketTimeoutMS: 45000, // 45 seconds
    });

    console.log('Test MongoDB server started successfully');
    
    // Return the server instance for cleanup
    return async () => {
      if (mongoServer) {
        await mongoose.disconnect();
        await mongoServer.stop();
        console.log('Test MongoDB server stopped');
      }
    };
  } catch (error) {
    console.error('Error starting test MongoDB server:');
    console.error(error);
    
    // Clean up if there was an error
    if (mongoServer) {
      try {
        await mongoServer.stop();
      } catch (e) {
        console.error('Error stopping MongoDB server after error:', e);
      }
    }
    
    throw error;
  }
};
