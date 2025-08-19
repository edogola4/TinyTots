const { MongoClient } = require('mongodb');

async function checkMongoDB() {
  const uri = 'mongodb://localhost:27017';
  const client = new MongoClient(uri);

  try {
    await client.connect();
    console.log('Successfully connected to MongoDB!');
    const adminDb = client.db('admin');
    const result = await adminDb.command({ ping: 1 });
    console.log('Ping result:', result);
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
  } finally {
    await client.close();
  }
}

checkMongoDB();
