const mongoose = require('mongoose');
const dotenv = require('dotenv');
const UserRole = require('../src/models/UserRole');

// Load environment variables
dotenv.config({ path: './config/config.env' });

// Connect to DB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

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

const initRoles = async () => {
  try {
    // Delete existing roles
    await UserRole.deleteMany({});
    
    // Create default roles
    const createdRoles = await UserRole.insertMany(defaultRoles);
    
    console.log('Default roles created successfully:');
    createdRoles.forEach(role => {
      console.log(`- ${role.name}: ${role.description}`);
    });
    
    process.exit(0);
  } catch (error) {
    console.error('Error initializing roles:', error);
    process.exit(1);
  }
};

// Run the script
initRoles();
