const ErrorResponse = require('../utils/errorResponse');
const UserRole = require('../models/UserRole');
const asyncHandler = require('../middleware/async');

// @desc    Get all user roles
// @route   GET /api/v1/roles
// @access  Private/Admin
exports.getRoles = asyncHandler(async (req, res, next) => {
  res.status(200).json(res.advancedResults);
});

// @desc    Get single user role
// @route   GET /api/v1/roles/:id
// @access  Private/Admin
exports.getRole = asyncHandler(async (req, res, next) => {
  const role = await UserRole.findById(req.params.id);

  if (!role) {
    return next(
      new ErrorResponse(`Role not found with id of ${req.params.id}`, 404)
    );
  }

  res.status(200).json({
    success: true,
    data: role
  });
});

// @desc    Create new role
// @route   POST /api/v1/roles
// @access  Private/Admin
exports.createRole = asyncHandler(async (req, res, next) => {
  // Check if role with same name already exists
  const existingRole = await UserRole.findOne({ name: req.body.name });
  if (existingRole) {
    return next(
      new ErrorResponse(`Role with name '${req.body.name}' already exists`, 400)
    );
  }

  const role = await UserRole.create(req.body);

  res.status(201).json({
    success: true,
    data: role
  });
});

// @desc    Update role
// @route   PUT /api/v1/roles/:id
// @access  Private/Admin
exports.updateRole = asyncHandler(async (req, res, next) => {
  // Don't allow changing the name of default roles
  const defaultRoles = ['admin', 'editor', 'viewer'];
  const role = await UserRole.findById(req.params.id);
  
  if (!role) {
    return next(
      new ErrorResponse(`Role not found with id of ${req.params.id}`, 404)
    );
  }

  if (defaultRoles.includes(role.name) && req.body.name && req.body.name !== role.name) {
    return next(
      new ErrorResponse(`Cannot change name of default role '${role.name}'`, 400)
    );
  }

  // Prevent changing certain permissions for admin role
  if (role.name === 'admin') {
    req.body.permissions = { ...role.permissions, ...req.body.permissions };
  }

  const updatedRole = await UserRole.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true
  });

  res.status(200).json({
    success: true,
    data: updatedRole
  });
});

// @desc    Delete role
// @route   DELETE /api/v1/roles/:id
// @access  Private/Admin
exports.deleteRole = asyncHandler(async (req, res, next) => {
  const role = await UserRole.findById(req.params.id);
  
  if (!role) {
    return next(
      new ErrorResponse(`Role not found with id of ${req.params.id}`, 404)
    );
  }

  // Prevent deletion of default roles
  const defaultRoles = ['admin', 'editor', 'viewer'];
  if (defaultRoles.includes(role.name)) {
    return next(
      new ErrorResponse(`Cannot delete default role '${role.name}'`, 400)
    );
  }

  // Check if any users are assigned to this role
  const User = require('./User');
  const usersWithRole = await User.find({ role: role._id });
  
  if (usersWithRole.length > 0) {
    return next(
      new ErrorResponse(
        `Cannot delete role as it is assigned to ${usersWithRole.length} user(s)`,
        400
      )
    );
  }

  await role.remove();

  res.status(200).json({
    success: true,
    data: {}
  });
});

// @desc    Get users with specific role
// @route   GET /api/v1/roles/:id/users
// @access  Private/Admin
exports.getUsersWithRole = asyncHandler(async (req, res, next) => {
  const User = require('./User');
  
  const users = await User.find({ role: req.params.id })
    .select('-password')
    .populate('role', 'name');

  res.status(200).json({
    success: true,
    count: users.length,
    data: users
  });
});

// @desc    Initialize default roles
// @route   GET /api/v1/roles/init
// @access  Private/Admin
exports.initializeRoles = asyncHandler(async (req, res, next) => {
  await UserRole.initializeRoles();
  
  const roles = await UserRole.find({});
  
  res.status(200).json({
    success: true,
    count: roles.length,
    data: roles
  });
});
