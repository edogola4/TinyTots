const { MongoClient } = require('mongodb');
const uri = 'mongodb://localhost:27017/tinytots';
const client = new MongoClient(uri);

async function createDefaultRole() {
  try {
    await client.connect();
    const db = client.db('tinytots');
    
    // Check if default role already exists
    const existingRole = await db.collection('roles').findOne({ isDefault: true });
    
    if (existingRole) {
      console.log('Default role already exists:', existingRole);
      return;
    }
    
    const defaultRole = {
      name: 'user',
      description: 'Default user role',
      permissions: {
        viewProfile: true,
        editProfile: true,
        viewProducts: true,
        makeOrders: true,
        viewOrders: true,
        cancelOrders: true
      },
      isDefault: true,
      createdAt: new Date(),
      updatedAt: new Date()
    };

    const result = await db.collection('roles').insertOne(defaultRole);
    console.log('Default role created successfully');
    console.log('Role ID:', result.insertedId);
    
  } catch (error) {
    console.error('Error creating default role:', error);
  } finally {
    await client.close();
    process.exit(0);
  }
}

createDefaultRole();
