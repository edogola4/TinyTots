const mongoose = require('mongoose');

const RoleSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Please add a name'],
      unique: true,
      trim: true,
      maxlength: [50, 'Name cannot be more than 50 characters'],
    },
    description: {
      type: String,
      required: [true, 'Please add a description'],
      maxlength: [500, 'Description cannot be more than 500 characters'],
    },
    permissions: {
      type: [String],
      required: true,
      enum: [
        'read:users',
        'write:users',
        'read:roles',
        'write:roles',
        'read:products',
        'write:products',
        'read:categories',
        'write:categories',
        'read:orders',
        'write:orders',
      ],
    },
    isDefault: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

// Prevent deletion of default roles
RoleSchema.pre('remove', async function (next) {
  if (this.isDefault) {
    next(new Error('Default roles cannot be deleted'));
  } else {
    next();
  }
});

// Create a compound index for unique name
RoleSchema.index({ name: 1 }, { unique: true });

module.exports = mongoose.model('Role', RoleSchema);
