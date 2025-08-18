const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');

// Import UserRole model
const UserRole = require('./UserRole');

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please add a name'],
    trim: true,
    maxlength: [50, 'Name cannot be more than 50 characters']
  },
  email: {
    type: String,
    required: [true, 'Please add an email'],
    unique: true,
    match: [
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      'Please add a valid email'
    ]
  },
  role: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'UserRole',
    required: true,
    default: async function() {
      // Default to 'viewer' role
      const defaultRole = await UserRole.findOne({ name: 'viewer' });
      return defaultRole ? defaultRole._id : null;
    },
    validate: {
      validator: async function(roleId) {
        if (!roleId) return false;
        const role = await UserRole.findById(roleId);
        return !!role;
      },
      message: 'Invalid role ID'
    }
  },
  permissions: {
    // This will be populated based on the assigned role
    type: Map,
    of: Boolean,
    default: {}
  },
  password: {
    type: String,
    required: [true, 'Please add a password'],
    minlength: 6,
    select: false
  },
  phone: {
    type: String,
    maxlength: [20, 'Phone number cannot be longer than 20 characters']
  },
  address: {
    street: String,
    city: String,
    state: String,
    zipcode: String,
    country: {
      type: String,
      default: 'Kenya'
    }
  },
  avatar: {
    type: String,
    default: 'no-photo.jpg'
  },
  isEmailVerified: {
    type: Boolean,
    default: false
  },
  emailVerificationToken: String,
  resetPasswordToken: String,
  resetPasswordExpire: Date,
  twoFactorCode: String,
  twoFactorCodeExpire: Date,
  twoFactorEnable: {
    type: Boolean,
    default: false
  },
  active: {
    type: Boolean,
    default: true,
    select: false
  }
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// Encrypt password using bcrypt
UserSchema.pre('save', async function(next) {
  if (!this.isModified('password')) {
    next();
  }

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

// Sign JWT and return
UserSchema.methods.getSignedJwtToken = function() {
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE
  });
};

// Match user entered password to hashed password in database
UserSchema.methods.matchPassword = async function(enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

// Check if user has specific permission
UserSchema.methods.hasPermission = function(permission) {
  return this.permissions.get(permission) === true;
};

// Check if user has any of the specified permissions
UserSchema.methods.hasAnyPermission = function(permissions) {
  return permissions.some(permission => this.permissions.get(permission) === true);
};

// Check if user has all of the specified permissions
UserSchema.methods.hasAllPermissions = function(permissions) {
  return permissions.every(permission => this.permissions.get(permission) === true);
};

// Middleware to update user permissions when role changes
UserSchema.pre('save', async function(next) {
  if (this.isModified('role') || this.isNew) {
    try {
      const role = await UserRole.findById(this.role);
      if (role) {
        this.permissions = role.permissions;
      }
    } catch (error) {
      console.error('Error updating user permissions:', error);
    }
  }
  next();
});

// Generate and hash password token
UserSchema.methods.getResetPasswordToken = function() {
  // Generate token
  const resetToken = crypto.randomBytes(20).toString('hex');

  // Hash token and set to resetPasswordToken field
  this.resetPasswordToken = crypto
    .createHash('sha256')
    .update(resetToken)
    .digest('hex');

  // Set expire
  this.resetPasswordExpire = Date.now() + 10 * 60 * 1000;

  return resetToken;
};

// Generate email verify token
UserSchema.methods.generateEmailVerifyToken = function() {
  // Generate token
  const verifyToken = crypto.randomBytes(20).toString('hex');

  // Hash token and set to emailVerificationToken field
  this.emailVerificationToken = crypto
    .createHash('sha256')
    .update(verifyToken)
    .digest('hex');

  return verifyToken;
};

// Virtual for user's orders
UserSchema.virtual('orders', {
  ref: 'Order',
  localField: '_id',
  foreignField: 'user',
  justOne: false
});

// Remove password from output
UserSchema.methods.toJSON = function() {
  const userObject = this.toObject();
  delete userObject.password;
  delete userObject.resetPasswordToken;
  delete userObject.resetPasswordExpire;
  delete userObject.emailVerificationToken;
  return userObject;
};

module.exports = mongoose.model('User', UserSchema);