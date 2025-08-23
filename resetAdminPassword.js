const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const dotenv = require('dotenv');

// Load environment variables
dotenv.config({ path: './server/.env' });

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/tinytots', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// User model
const User = require('./server/src/models/User');

const resetPassword = async () => {
  try {
    // Hash the new password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash('admin123', salt);

    // Update the admin user's password
    const result = await User.updateOne(
      { email: 'admin@tinytots.com' },
      { $set: { password: hashedPassword } }
    );

    if (result.nModified === 0) {
      console.log('No user found with email admin@tinytots.com');
    } else {
      console.log('Password reset successfully!');
      console.log('New password: admin123');
    }
  } catch (error) {
    console.error('Error resetting password:', error);
  } finally {
    // Close the connection
    await mongoose.connection.close();
  }
};

resetPassword();
