const { MongoClient } = require('mongodb');
const uri = 'mongodb://localhost:27017/tinytots';
const client = new MongoClient(uri);

async function fixDefaultRole() {
  try {
    await client.connect();
    const db = client.db('tinytots');
    
    // Get the role from roles collection
    const role = await db.collection('roles').findOne({ isDefault: true });
    
    if (!role) {
      console.log('No default role found in roles collection');
      return;
    }
    
    // Check if role already exists in userroles collection
    const existingRole = await db.collection('userroles').findOne({ name: 'user' });
    
    if (existingRole) {
      console.log('Default role already exists in userroles collection');
      return;
    }
    
    // Add to userroles collection
    const { _id, ...roleData } = role;
    const result = await db.collection('userroles').insertOne({
      ...roleData,
      isDefault: true
    });
    
    console.log('Default role added to userroles collection');
    
  } catch (error) {
    console.error('Error fixing default role:', error);
  } finally {
    await client.close();
    process.exit(0);
  }
}

fixDefaultRole();
