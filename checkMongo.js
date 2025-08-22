const { MongoClient } = require('mongodb');

async function checkMongo() {
  const uri = 'mongodb://localhost:27017';
  const client = new MongoClient(uri);

  try {
    await client.connect();
    console.log('Successfully connected to MongoDB');
    
    const adminDb = client.db('admin');
    const result = await adminDb.command({ listDatabases: 1 });
    console.log('Available databases:');
    console.log(result.databases.map(db => db.name));
    
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
  } finally {
    await client.close();
    process.exit(0);
  }
}

checkMongo();
