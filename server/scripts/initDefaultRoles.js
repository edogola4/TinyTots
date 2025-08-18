const mongoose = require('mongoose');
require('dotenv').config({ path: './.env' });
const UserRole = require('../src/models/UserRole');

const defaultRoles = [
  {
    name: 'admin',
    description: 'Administrator with full access',
    permissions: {
      viewUsers: true,
      createUsers: true,
      editUsers: true,
      deleteUsers: true,
      viewProducts: true,
      createProducts: true,
      editProducts: true,
      deleteProducts: true,
      viewOrders: true,
      updateOrderStatus: true,
      processRefunds: true,
      manageContent: true,
      manageSettings: true,
    },
    isDefault: true,
  },
  {
    name: 'editor',
    description: 'Editor with content management access',
    permissions: {
      viewUsers: true,
      createUsers: false,
      editUsers: false,
      deleteUsers: false,
      viewProducts: true,
      createProducts: true,
      editProducts: true,
      deleteProducts: false,
      viewOrders: true,
      updateOrderStatus: true,
      processRefunds: false,
      manageContent: true,
      manageSettings: false,
    },
    isDefault: true,
  },
  {
    name: 'viewer',
    description: 'Viewer with read-only access',
    permissions: {
      viewUsers: true,
      createUsers: false,
      editUsers: false,
      deleteUsers: false,
      viewProducts: true,
      createProducts: false,
      editProducts: false,
      deleteProducts: false,
      viewOrders: true,
      updateOrderStatus: false,
      processRefunds: false,
      manageContent: false,
      manageSettings: false,
    },
    isDefault: true,
  },
];

const initDefaultRoles = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log('Connected to MongoDB');

    // Remove existing roles
    await UserRole.deleteMany({});
    console.log('Removed existing roles');

    // Create default roles
    const createdRoles = await UserRole.insertMany(defaultRoles);
    console.log('Created default roles:', createdRoles.map(r => r.name).join(', '));

    process.exit(0);
  } catch (error) {
    console.error('Error initializing default roles:', error);
    process.exit(1);
  }
};

initDefaultRoles();
