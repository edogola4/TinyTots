const { MongoClient, ObjectId } = require('mongodb');
const bcrypt = require('bcryptjs');

async function createAdminUser() {
  const uri = 'mongodb://localhost:27017/tinytots';
  const client = new MongoClient(uri);

  try {
    await client.connect();
    console.log('Successfully connected to MongoDB');
    
    const db = client.db('tinytots');
    
    // Check if admin role exists, create if it doesn't
    let adminRole = await db.collection('userroles').findOne({ name: 'admin' });
    
    if (!adminRole) {
      console.log('Creating admin role...');
      const roleResult = await db.collection('userroles').insertOne({
        name: 'admin',
        description: 'Administrator with full access',
        permissions: {
          manageUsers: true,
          manageProducts: true,
          manageOrders: true,
          viewDashboard: true,
          viewReports: true,
          manageSettings: true
        },
        createdAt: new Date(),
        updatedAt: new Date()
      });
      adminRole = { _id: roleResult.insertedId, name: 'admin' };
      console.log('Admin role created');
    } else {
      console.log('Admin role already exists');
    }
    
    // Check if admin user exists
    const adminEmail = 'admin@tinytots.com';
    const existingAdmin = await db.collection('users').findOne({ email: adminEmail });
    
    if (existingAdmin) {
      console.log('Admin user already exists:', existingAdmin.email);
      return;
    }
    
    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash('admin123', salt);
    
    // Create admin user
    const result = await db.collection('users').insertOne({
      name: 'Admin User',
      email: adminEmail,
      password: hashedPassword,
      role: adminRole._id,
      isActive: true,
      createdAt: new Date(),
      updatedAt: new Date()
    });
    
    console.log('Admin user created successfully');
    console.log('Email: admin@tinytots.com');
    console.log('Password: admin123');
    
  } catch (error) {
    console.error('Error creating admin user:', error);
  } finally {
    await client.close();
    process.exit(0);
  }
}

createAdminUser();
