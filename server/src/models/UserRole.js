import mongoose from 'mongoose';

const userRoleSchema = new mongoose.Schema(
  {
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
      default: {
        // User Management
        viewUsers: false,
        createUsers: false,
        editUsers: false,
        deleteUsers: false,
        
        // Product Management
        viewProducts: false,
        createProducts: false,
        editProducts: false,
        deleteProducts: false,
        
        // Order Management
        viewOrders: false,
        updateOrderStatus: false,
        processRefunds: false,
        
        // Content Management
        manageContent: false,
        
        // System Settings
        manageSettings: false,
      },
    },
    description: {
      type: String,
      trim: true,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

// Predefined roles with their permissions
const ROLES = {
  admin: {
    name: 'admin',
    description: 'Full access to all features',
    permissions: {
      viewUsers: true,
      createUsers: true,
      editUsers: true,
      deleteUsers: true,
      viewProducts: true,
      createProducts: true,
      editProducts: true,
      deleteProducts: true,
      viewOrders: true,
      updateOrderStatus: true,
      processRefunds: true,
      manageContent: true,
      manageSettings: true,
    },
  },
  editor: {
    name: 'editor',
    description: 'Can create and edit content',
    permissions: {
      viewUsers: true,
      viewProducts: true,
      createProducts: true,
      editProducts: true,
      viewOrders: true,
      updateOrderStatus: true,
      manageContent: true,
    },
  },
  viewer: {
    name: 'viewer',
    description: 'Read-only access',
    permissions: {
      viewUsers: true,
      viewProducts: true,
      viewOrders: true,
    },
  },
};

// Create default roles if they don't exist
userRoleSchema.statics.initializeRoles = async function () {
  try {
    for (const [key, role] of Object.entries(ROLES)) {
      await this.findOneAndUpdate(
        { name: key },
        { $setOnInsert: role },
        { upsert: true, new: true, setDefaultsOnInsert: true }
      );
    }
    console.log('Default roles initialized');
  } catch (error) {
    console.error('Error initializing roles:', error);
  }
};

const UserRole = mongoose.model('UserRole', userRoleSchema);

export default UserRole;
