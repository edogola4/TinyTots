const mongoose = require('mongoose');
const UserRole = require('./server/src/models/UserRole');

async function initDefaultRoles() {
  try {
    // Connect to MongoDB
    await mongoose.connect('mongodb://localhost:27017/tinytots', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('Connected to MongoDB');

    // Define default roles
    const defaultRoles = [
      {
        name: 'admin',
        description: 'Administrator with full access',
        permissions: {
          manageUsers: true,
          manageProducts: true,
          manageOrders: true,
          viewDashboard: true,
          viewReports: true,
          manageSettings: true
        }
      },
      {
        name: 'editor',
        description: 'Editor with content management access',
        permissions: {
          manageProducts: true,
          viewDashboard: true,
          viewReports: true
        }
      },
      {
        name: 'viewer',
        description: 'Viewer with read-only access',
        permissions: {
          viewDashboard: true
        }
      }
    ];

    // Insert default roles if they don't exist
    for (const role of defaultRoles) {
      const existingRole = await UserRole.findOne({ name: role.name });
      if (!existingRole) {
        await UserRole.create(role);
        console.log(`Created role: ${role.name}`);
      } else {
        console.log(`Role already exists: ${role.name}`);
      }
    }

    console.log('Default roles initialized successfully');
    process.exit(0);
  } catch (error) {
    console.error('Error initializing roles:', error);
    process.exit(1);
  }
}

initDefaultRoles();
