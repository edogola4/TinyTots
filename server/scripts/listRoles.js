const mongoose = require('mongoose');
require('dotenv').config({ path: './.env' });
const UserRole = require('../src/models/UserRole');

const listRoles = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log('Connected to MongoDB');

    // List all roles
    const roles = await UserRole.find({});
    console.log('Roles in database:');
    console.log(JSON.stringify(roles, null, 2));
    
    process.exit(0);
  } catch (error) {
    console.error('Error listing roles:', error);
    process.exit(1);
  }
};

listRoles();
