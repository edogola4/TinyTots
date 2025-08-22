const { MongoClient } = require('mongodb');

async function checkCollections() {
  const uri = 'mongodb://localhost:27017/tinytots';
  const client = new MongoClient(uri);

  try {
    await client.connect();
    console.log('Successfully connected to MongoDB');
    
    const db = client.db('tinytots');
    const collections = await db.listCollections().toArray();
    
    console.log('Collections in tinytops database:');
    console.log(collections.map(c => c.name));
    
    // Check if users collection exists and has any documents
    if (collections.some(c => c.name === 'users')) {
      const users = await db.collection('users').find({}).toArray();
      console.log('\nUsers in the database:');
      console.log(users.map(u => ({ _id: u._id, email: u.email, name: u.name })));
    }
    
    // Check if userroles collection exists
    if (collections.some(c => c.name === 'userroles')) {
      const roles = await db.collection('userroles').find({}).toArray();
      console.log('\nUser roles in the database:');
      console.log(roles.map(r => ({ name: r.name, description: r.description })));
    }
    
  } catch (error) {
    console.error('Error checking collections:', error);
  } finally {
    await client.close();
    process.exit(0);
  }
}

checkCollections();
