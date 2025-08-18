const mongoose = require('mongoose');
require('dotenv').config();

// Import the UserRole model
const UserRole = require('../models/UserRole');

// Default roles configuration
const DEFAULT_ROLES = [
  {
    name: 'admin',
    description: 'Administrator with full access to all features',
    isActive: true,
    permissions: {
      // User Management
      viewUsers: true,
      createUsers: true,
      editUsers: true,
      deleteUsers: true,
      
      // Product Management
      viewProducts: true,
      createProducts: true,
      editProducts: true,
      deleteProducts: true,
      
      // Order Management
      viewOrders: true,
      updateOrderStatus: true,
      processRefunds: true,
      
      // Content Management
      manageContent: true,
      
      // System Settings
      manageSettings: true,
    }
  },
  {
    name: 'editor',
    description: 'Editor with content management permissions',
    isActive: true,
    permissions: {
      // User Management
      viewUsers: true,
      
      // Product Management
      viewProducts: true,
      createProducts: true,
      editProducts: true,
      
      // Order Management
      viewOrders: true,
      updateOrderStatus: true,
      
      // Content Management
      manageContent: true,
    }
  },
  {
    name: 'viewer',
    description: 'Viewer with read-only access',
    isActive: true,
    permissions: {
      // User Management
      viewUsers: true,
      
      // Product Management
      viewProducts: true,
      
      // Order Management
      viewOrders: true,
    }
  }
];

// Connect to MongoDB
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('MongoDB Connected...');
  } catch (err) {
    console.error('MongoDB connection error:', err);
    process.exit(1);
  }
};

// Initialize default roles
const initializeDefaultRoles = async () => {
  try {
    await connectDB();
    
    // Check if roles already exist
    const existingRoles = await UserRole.find({});
    
    if (existingRoles.length > 0) {
      console.log('Roles already exist in the database. Skipping initialization.');
      process.exit(0);
    }
    
    // Create default roles
    for (const roleData of DEFAULT_ROLES) {
      const role = new UserRole(roleData);
      await role.save();
      console.log(`Created role: ${role.name}`);
    }
    
    console.log('Default roles initialized successfully');
    process.exit(0);
  } catch (error) {
    console.error('Error initializing default roles:', error);
    process.exit(1);
  }
};

initializeDefaultRoles();
