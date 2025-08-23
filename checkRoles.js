const { MongoClient } = require('mongodb');
const uri = 'mongodb://localhost:27017/tinytots';
const client = new MongoClient(uri);

async function checkRoles() {
  try {
    await client.connect();
    const db = client.db('tinytots');
    
    // List all collections
    const collections = await db.listCollections().toArray();
    console.log('Collections:', collections.map(c => c.name));
    
    // Check roles collection
    const roles = await db.collection('roles').find().toArray();
    console.log('Roles:', JSON.stringify(roles, null, 2));
    
    // Check userroles collection as well
    try {
      const userRoles = await db.collection('userroles').find().toArray();
      console.log('User Roles:', JSON.stringify(userRoles, null, 2));
    } catch (e) {
      console.log('User Roles collection does not exist or is empty');
    }
    
  } catch (error) {
    console.error('Error checking roles:', error);
  } finally {
    await client.close();
    process.exit(0);
  }
}

checkRoles();
