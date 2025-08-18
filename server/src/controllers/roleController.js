const Role = require('../models/Role');
const User = require('../models/User');
const asyncHandler = require('../middleware/async');
const ErrorResponse = require('../utils/errorResponse');

// @desc    Get all roles
// @route   GET /api/v1/roles
// @access  Private/Admin
exports.getRoles = asyncHandler(async (req, res, next) => {
  res.status(200).json(res.advancedResults);
});

// @desc    Get single role
// @route   GET /api/v1/roles/:id
// @access  Private/Admin
exports.getRole = asyncHandler(async (req, res, next) => {
  const role = await Role.findById(req.params.id);

  if (!role) {
    return next(
      new ErrorResponse(`Role not found with id of ${req.params.id}`, 404)
    );
  }

  res.status(200).json({ success: true, data: role });
});

// @desc    Create role
// @route   POST /api/v1/roles
// @access  Private/Admin
exports.createRole = asyncHandler(async (req, res, next) => {
  const role = await Role.create(req.body);
  res.status(201).json({ success: true, data: role });
});

// @desc    Update role
// @route   PUT /api/v1/roles/:id
// @access  Private/Admin
exports.updateRole = asyncHandler(async (req, res, next) => {
  let role = await Role.findById(req.params.id);

  if (!role) {
    return next(
      new ErrorResponse(`Role not found with id of ${req.params.id}`, 404)
    );
  }

  role = await Role.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  res.status(200).json({ success: true, data: role });
});

// @desc    Delete role
// @route   DELETE /api/v1/roles/:id
// @access  Private/Admin
exports.deleteRole = asyncHandler(async (req, res, next) => {
  const role = await Role.findById(req.params.id);

  if (!role) {
    return next(
      new ErrorResponse(`Role not found with id of ${req.params.id}`, 404)
    );
  }

  await role.remove();

  res.status(200).json({ success: true, data: {} });
});

// @desc    Get users with a specific role
// @route   GET /api/v1/roles/:id/users
// @access  Private/Admin
exports.getUsersWithRole = asyncHandler(async (req, res, next) => {
  const users = await User.find({ role: req.params.id }).select('-password');
  
  res.status(200).json({
    success: true,
    count: users.length,
    data: users
  });
});

// @desc    Initialize default roles
// @route   GET /api/v1/roles/init/roles
// @access  Private/Admin
exports.initializeRoles = asyncHandler(async (req, res, next) => {
  const defaultRoles = [
    {
      name: 'admin',
      description: 'Administrator with full access',
      permissions: [
        'read:users', 'write:users',
        'read:roles', 'write:roles',
        'read:products', 'write:products',
        'read:categories', 'write:categories',
        'read:orders', 'write:orders'
      ],
      isDefault: true
    },
    {
      name: 'editor',
      description: 'Editor with content management access',
      permissions: [
        'read:products', 'write:products',
        'read:categories', 'write:categories',
        'read:orders'
      ],
      isDefault: true
    },
    {
      name: 'viewer',
      description: 'Viewer with read-only access',
      permissions: [
        'read:products',
        'read:categories',
        'read:orders'
      ],
      isDefault: true
    }
  ];

  // Check if roles already exist
  const existingRoles = await Role.find({ name: { $in: ['admin', 'editor', 'viewer'] } });
  const existingRoleNames = existingRoles.map(role => role.name);
  
  // Only create roles that don't exist
  const rolesToCreate = defaultRoles.filter(role => !existingRoleNames.includes(role.name));
  
  if (rolesToCreate.length > 0) {
    await Role.insertMany(rolesToCreate);
  }

  res.status(200).json({
    success: true,
    message: 'Default roles initialized successfully',
    data: await Role.find({ name: { $in: ['admin', 'editor', 'viewer'] } })
  });
});
