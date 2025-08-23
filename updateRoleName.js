const { MongoClient } = require('mongodb');
const uri = 'mongodb://localhost:27017/tinytots';
const client = new MongoClient(uri);

async function updateRoleName() {
  try {
    await client.connect();
    const db = client.db('tinytots');
    
    // Update the role name from 'user' to 'viewer'
    const result = await db.collection('userroles').updateOne(
      { name: 'user' },
      { $set: { name: 'viewer' } }
    );
    
    if (result.modifiedCount > 0) {
      console.log('Successfully updated role name from "user" to "viewer"');
    } else {
      console.log('No documents were updated. The role might not exist or already have the correct name.');
    }
    
  } catch (error) {
    console.error('Error updating role name:', error);
  } finally {
    await client.close();
    process.exit(0);
  }
}

updateRoleName();
