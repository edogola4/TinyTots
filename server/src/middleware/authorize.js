const ErrorResponse = require('../utils/errorResponse');
const User = require('../models/User');

// Grant access to specific roles
exports.authorize = (...roles) => {
  return async (req, res, next) => {
    try {
      // Get user from database to ensure we have the latest permissions
      const user = await User.findById(req.user.id);
      
      if (!user) {
        return next(new ErrorResponse('User not found', 404));
      }

      // Check if user has any of the required roles
      const hasRequiredRole = roles.some(role => 
        user.role && user.role.name === role
      );

      if (!hasRequiredRole) {
        return next(
          new ErrorResponse(
            `User role ${user.role.name} is not authorized to access this route`,
            403
          )
        );
      }

      next();
    } catch (error) {
      next(error);
    }
  };
};

// Grant access based on specific permissions
exports.checkPermission = (...permissions) => {
  return async (req, res, next) => {
    try {
      // Get user from database to ensure we have the latest permissions
      const user = await User.findById(req.user.id);
      
      if (!user) {
        return next(new ErrorResponse('User not found', 404));
      }

      // Check if user has all required permissions
      const hasAllPermissions = permissions.every(permission => 
        user.permissions.get(permission) === true
      );

      if (!hasAllPermissions) {
        return next(
          new ErrorResponse(
            'You do not have permission to perform this action',
            403
          )
        );
      }

      next();
    } catch (error) {
      next(error);
    }
  };
};

// Middleware to check if user can manage users
exports.canManageUsers = (req, res, next) => {
  return this.checkPermission('manageUsers')(req, res, next);
};

// Middleware to check if user can manage products
exports.canManageProducts = (req, res, next) => {
  return this.checkPermission('manageProducts')(req, res, next);
};

// Middleware to check if user can manage orders
exports.canManageOrders = (req, res, next) => {
  return this.checkPermission('manageOrders')(req, res, next);
};

// Middleware to check if user can manage content
exports.canManageContent = (req, res, next) => {
  return this.checkPermission('manageContent')(req, res, next);
};

// Middleware to check if user can manage settings
exports.canManageSettings = (req, res, next) => {
  return this.checkPermission('manageSettings')(req, res, next);
};
