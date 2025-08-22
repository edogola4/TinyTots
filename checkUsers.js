const mongoose = require('mongoose');
require('dotenv').config({ path: './server/.env' });

const User = require('./server/src/models/User');

async function checkUsers() {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/tinytots', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('Connected to MongoDB');

    // Check for the specific user
    const user = await User.findOne({ email: 'edogola4@gmail.com' });
    
    if (user) {
      console.log('User found:', {
        email: user.email,
        name: user.name,
        role: user.role,
        createdAt: user.createdAt
      });
    } else {
      console.log('No user found with email: edogola4@gmail.com');
      
      // List all users (for debugging)
      const allUsers = await User.find({}).select('email name role');
      console.log('All users in database:');
      console.log(allUsers);
    }
    
    process.exit(0);
  } catch (error) {
    console.error('Error:', error.message);
    process.exit(1);
  }
}

checkUsers();
