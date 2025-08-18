const mongoose = require('mongoose');
require('dotenv').config();

// Connect to MongoDB
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('MongoDB Connected...');
  } catch (err) {
    console.error('MongoDB connection error:', err);
    process.exit(1);
  }
};

// Migration function
const migrate = async () => {
  try {
    await connectDB();
    
    // Create UserRole collection
    const UserRole = mongoose.model(
      'UserRole',
      new mongoose.Schema({
        name: {
          type: String,
          required: true,
          unique: true,
          trim: true,
          enum: ['admin', 'editor', 'viewer'],
          default: 'viewer',
        },
        permissions: {
          type: Map,
          of: Boolean,
          default: {}
        },
        description: String,
        isActive: {
          type: Boolean,
          default: true
        }
      }, { timestamps: true })
    );

    // Add role field to User schema
    const userSchema = new mongoose.Schema({
      // Existing fields...
      role: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'UserRole'
      },
      permissions: {
        type: Map,
        of: Boolean,
        default: {}
      }
    });

    // Create or update User model
    let User;
    try {
      User = mongoose.model('User');
    } catch (e) {
      User = mongoose.model('User', userSchema);
    }

    // Add role field if it doesn't exist
    if (!User.schema.path('role')) {
      User.schema.add({
        role: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'UserRole'
        },
        permissions: {
          type: Map,
          of: Boolean,
          default: {}
        }
      });
      
      // Recompile the model to apply changes
      User = mongoose.model('User', User.schema);
    }

    console.log('Migration completed successfully');
    process.exit(0);
  } catch (error) {
    console.error('Migration failed:', error);
    process.exit(1);
  }
};

migrate();
