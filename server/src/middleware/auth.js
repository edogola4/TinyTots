const jwt = require('jsonwebtoken');
const User = require('../models/User');
const UserRole = require('../models/UserRole');
const ErrorResponse = require('../utils/errorResponse');

// Protect routes
exports.protect = async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    // Set token from Bearer token in header
    token = req.headers.authorization.split(' ')[1];
  }
  // Set token from cookie
  // else if (req.cookies.token) {
  //   token = req.cookies.token;
  // }

  // Make sure token exists
  if (!token) {
    return next(new ErrorResponse('Not authorized to access this route', 401));
  }

  try {
    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Get user from the token
    const user = await User.findById(decoded.id).populate('role');
    
    if (!user) {
      return next(new ErrorResponse('User not found', 404));
    }

    // Check if user's role is still active
    if (user.role && !user.role.isActive) {
      return next(new ErrorResponse('Your role is no longer active', 403));
    }

    // Add user and role to request object
    req.user = user;
    next();
  } catch (err) {
    return next(new ErrorResponse('Not authorized to access this route', 401));
  }
};

// Grant access to specific roles
exports.authorize = (...roles) => {
  return (req, res, next) => {
    if (!req.user) {
      return next(new ErrorResponse('User not authenticated', 401));
    }

    // If no roles specified, just check if user is authenticated
    if (roles.length === 0) {
      return next();
    }

    // Check if user has one of the required roles
    if (!req.user.role || !roles.includes(req.user.role.name)) {
      return next(
        new ErrorResponse(
          `User role ${req.user.role ? req.user.role.name : 'none'} is not authorized to access this route`,
          403
        )
      );
    }

    next();
  };
};

// Check if user has specific permission
exports.checkPermission = (permission) => {
  return (req, res, next) => {
    if (!req.user) {
      return next(new ErrorResponse('User not authenticated', 401));
    }

    // If user is admin, they have all permissions
    if (req.user.role && req.user.role.name === 'admin') {
      return next();
    }

    // Check if user has the required permission
    if (!req.user.permissions || !req.user.permissions.get(permission)) {
      return next(
        new ErrorResponse(
          `You do not have permission to perform this action. Required permission: ${permission}`,
          403
        )
      );
    }

    next();
  };
};

// Check if user has any of the specified permissions
exports.checkAnyPermission = (...permissions) => {
  return (req, res, next) => {
    if (!req.user) {
      return next(new ErrorResponse('User not authenticated', 401));
    }

    // If user is admin, they have all permissions
    if (req.user.role && req.user.role.name === 'admin') {
      return next();
    }

    // Check if user has any of the required permissions
    const hasPermission = permissions.some(permission => 
      req.user.permissions && req.user.permissions.get(permission)
    );

    if (!hasPermission) {
      return next(
        new ErrorResponse(
          `You do not have permission to perform this action. Required one of: ${permissions.join(', ')}`,
          403
        )
      );
    }

    next();
  };
};
