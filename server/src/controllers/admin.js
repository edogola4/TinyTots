const User = require('../models/User');
const Product = require('../models/Product');
const Order = require('../models/Order');
const Review = require('../models/Review');
const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middleware/async');
const path = require('path');
const fs = require('fs');

// @desc    Get all users with filtering, sorting, and pagination
// @route   GET /api/v1/admin/users
// @access  Private/Admin
exports.getUsers = asyncHandler(async (req, res, next) => {
  // Copy req.query
  const reqQuery = { ...req.query };

  // Fields to exclude from filtering
  const removeFields = ['select', 'sort', 'page', 'limit'];
  removeFields.forEach(param => delete reqQuery[param]);

  // Create query string
  let queryStr = JSON.stringify(reqQuery);
  
  // Create operators ($gt, $gte, etc)
  queryStr = queryStr.replace(/\b(gt|gte|lt|lte|in)\b/g, match => `$${match}`);
  
  // Finding resource
  let query = User.find(JSON.parse(queryStr)).select('-password');

  // Select Fields
  if (req.query.select) {
    const fields = req.query.select.split(',').join(' ');
    query = query.select(fields);
  }

  // Sort
  if (req.query.sort) {
    const sortBy = req.query.sort.split(',').join(' ');
    query = query.sort(sortBy);
  } else {
    query = query.sort('-createdAt');
  }

  // Pagination
  const page = parseInt(req.query.page, 10) || 1;
  const limit = parseInt(req.query.limit, 10) || 25;
  const startIndex = (page - 1) * limit;
  const endIndex = page * limit;
  const total = await User.countDocuments(JSON.parse(queryStr));

  query = query.skip(startIndex).limit(limit);

  // Executing query
  const users = await query;

  // Pagination result
  const pagination = {};

  if (endIndex < total) {
    pagination.next = {
      page: page + 1,
      limit
    };
  }

  if (startIndex > 0) {
    pagination.prev = {
      page: page - 1,
      limit
    };
  }

  res.status(200).json({
    success: true,
    count: users.length,
    pagination,
    data: users
  });
});

// @desc    Get single user
// @route   GET /api/v1/admin/users/:id
// @access  Private/Admin
exports.getUser = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.params.id).select('-password');
  
  if (!user) {
    return next(new ErrorResponse(`User not found with id of ${req.params.id}`, 404));
  }

  res.status(200).json({
    success: true,
    data: user
  });
});

// @desc    Create user
// @route   POST /api/v1/admin/users
// @access  Private/Admin
exports.createUser = asyncHandler(async (req, res, next) => {
  // Check if user with email already exists
  const existingUser = await User.findOne({ email: req.body.email });
  if (existingUser) {
    return next(new ErrorResponse('User with this email already exists', 400));
  }

  // Create user
  const user = await User.create({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
    role: req.body.role || 'user'
  });

  // Remove password from output
  user.password = undefined;

  res.status(201).json({
    success: true,
    data: user
  });
});

// @desc    Update user
// @route   PUT /api/v1/admin/users/:id
// @access  Private/Admin
exports.updateUser = asyncHandler(async (req, res, next) => {
  // Check if email is being updated and if it's already taken
  if (req.body.email) {
    const existingUser = await User.findOne({ email: req.body.email });
    if (existingUser && existingUser._id.toString() !== req.params.id) {
      return next(new ErrorResponse('Email already in use', 400));
    }
  }

  const fieldsToUpdate = {
    name: req.body.name,
    email: req.body.email,
    role: req.body.role
  };

  // Only update password if provided
  if (req.body.password) {
    fieldsToUpdate.password = req.body.password;
  }

  const user = await User.findByIdAndUpdate(
    req.params.id,
    fieldsToUpdate,
    {
      new: true,
      runValidators: true
    }
  );

  if (!user) {
    return next(new ErrorResponse(`User not found with id of ${req.params.id}`, 404));
  }

  // Remove password from output
  user.password = undefined;

  res.status(200).json({
    success: true,
    data: user
  });
});

// @desc    Delete user
// @route   DELETE /api/v1/admin/users/:id
// @access  Private/Admin
exports.deleteUser = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.params.id);

  if (!user) {
    return next(new ErrorResponse(`User not found with id of ${req.params.id}`, 404));
  }

  // Prevent deleting own account
  if (user._id.toString() === req.user.id) {
    return next(new ErrorResponse('You cannot delete your own account', 403));
  }

  // Optionally, handle related data (orders, reviews, etc.)
  // For example, you might want to anonymize or transfer ownership
  
  await user.remove();

  res.status(200).json({
    success: true,
    data: {}
  });
});

// @desc    Get all products with filtering, sorting, and pagination
// @route   GET /api/v1/admin/products
// @access  Private/Admin
exports.getProducts = asyncHandler(async (req, res, next) => {
  // Copy req.query
  const reqQuery = { ...req.query };

  // Fields to exclude from filtering
  const removeFields = ['select', 'sort', 'page', 'limit'];
  removeFields.forEach(param => delete reqQuery[param]);

  // Create query string
  let queryStr = JSON.stringify(reqQuery);
  
  // Create operators ($gt, $gte, etc)
  queryStr = queryStr.replace(/\b(gt|gte|lt|lte|in)\b/g, match => `$${match}`);
  
  // Finding resource
  let query = Product.find(JSON.parse(queryStr));

  // Select Fields
  if (req.query.select) {
    const fields = req.query.select.split(',').join(' ');
    query = query.select(fields);
  }

  // Sort
  if (req.query.sort) {
    const sortBy = req.query.sort.split(',').join(' ');
    query = query.sort(sortBy);
  } else {
    query = query.sort('-createdAt');
  }

  // Pagination
  const page = parseInt(req.query.page, 10) || 1;
  const limit = parseInt(req.query.limit, 10) || 25;
  const startIndex = (page - 1) * limit;
  const endIndex = page * limit;
  const total = await Product.countDocuments(JSON.parse(queryStr));

  query = query.skip(startIndex).limit(limit);

  // Executing query
  const products = await query;

  // Pagination result
  const pagination = {};

  if (endIndex < total) {
    pagination.next = {
      page: page + 1,
      limit
    };
  }

  if (startIndex > 0) {
    pagination.prev = {
      page: page - 1,
      limit
    };
  }

  res.status(200).json({
    success: true,
    count: products.length,
    pagination,
    data: products
  });
});

// @desc    Create new product
// @route   POST /api/v1/admin/products
// @access  Private/Admin
exports.createProduct = asyncHandler(async (req, res, next) => {
  // Add user to req.body
  req.body.user = req.user.id;

  const product = await Product.create(req.body);

  res.status(201).json({
    success: true,
    data: product
  });
});

// @desc    Update product
// @route   PUT /api/v1/admin/products/:id
// @access  Private/Admin
exports.updateProduct = asyncHandler(async (req, res, next) => {
  let product = await Product.findById(req.params.id);

  if (!product) {
    return next(new ErrorResponse(`Product not found with id of ${req.params.id}`, 404));
  }

  // Make sure user is product owner or admin
  if (product.user.toString() !== req.user.id && req.user.role !== 'admin') {
    return next(new ErrorResponse(`User ${req.user.id} is not authorized to update this product`, 401));
  }

  product = await Product.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true
  });

  res.status(200).json({
    success: true,
    data: product
  });
});

// @desc    Delete product
// @route   DELETE /api/v1/admin/products/:id
// @access  Private/Admin
exports.deleteProduct = asyncHandler(async (req, res, next) => {
  const product = await Product.findById(req.params.id);

  if (!product) {
    return next(new ErrorResponse(`Product not found with id of ${req.params.id}`, 404));
  }

  // Make sure user is product owner or admin
  if (product.user.toString() !== req.user.id && req.user.role !== 'admin') {
    return next(new ErrorResponse(`User ${req.user.id} is not authorized to delete this product`, 401));
  }

  // Delete product images from filesystem
  if (product.images && product.images.length > 0) {
    product.images.forEach(image => {
      const imagePath = path.join(__dirname, `../../public/uploads/${image}`);
      if (fs.existsSync(imagePath)) {
        fs.unlink(imagePath, err => {
          if (err) console.error(`Error deleting image: ${image}`, err);
        });
      }
    });
  }

  await product.remove();

  res.status(200).json({
    success: true,
    data: {}
  });
});

// @desc    Upload photo for product
// @route   PUT /api/v1/admin/products/:id/photo
// @access  Private/Admin
exports.productPhotoUpload = asyncHandler(async (req, res, next) => {
  const product = await Product.findById(req.params.id);

  if (!product) {
    return next(new ErrorResponse(`Product not found with id of ${req.params.id}`, 404));
  }

  if (!req.files) {
    return next(new ErrorResponse(`Please upload a file`, 400));
  }

  const file = req.files.file;

  // Make sure the image is a photo
  if (!file.mimetype.startsWith('image')) {
    return next(new ErrorResponse(`Please upload an image file`, 400));
  }

  // Check filesize
  if (file.size > process.env.MAX_FILE_UPLOAD) {
    return next(
      new ErrorResponse(
        `Please upload an image less than ${process.env.MAX_FILE_UPLOAD / 1000}KB`,
        400
      )
    );
  }

  // Create custom filename
  file.name = `photo_${product._id}${path.parse(file.name).ext}`;

  file.mv(`${process.env.FILE_UPLOAD_PATH}/${file.name}`, async err => {
    if (err) {
      console.error(err);
      return next(new ErrorResponse(`Problem with file upload`, 500));
    }

    // Add image to product
    if (!product.images.includes(file.name)) {
      product.images.push(file.name);
      await product.save();
    }

    res.status(200).json({
      success: true,
      data: file.name
    });
  });
});

// @desc    Get all orders
// @route   GET /api/v1/admin/orders
// @access  Private/Admin
exports.getOrders = asyncHandler(async (req, res, next) => {
  // Copy req.query
  const reqQuery = { ...req.query };

  // Fields to exclude from filtering
  const removeFields = ['select', 'sort', 'page', 'limit'];
  removeFields.forEach(param => delete reqQuery[param]);

  // Create query string
  let queryStr = JSON.stringify(reqQuery);
  
  // Create operators ($gt, $gte, etc)
  queryStr = queryStr.replace(/\b(gt|gte|lt|lte|in)\b/g, match => `$${match}`);
  
  // Finding resource
  let query = Order.find(JSON.parse(queryStr))
    .populate('user', 'name email')
    .populate('orderItems.product', 'name price images');

  // Select Fields
  if (req.query.select) {
    const fields = req.query.select.split(',').join(' ');
    query = query.select(fields);
  }

  // Sort
  if (req.query.sort) {
    const sortBy = req.query.sort.split(',').join(' ');
    query = query.sort(sortBy);
  } else {
    query = query.sort('-createdAt');
  }

  // Pagination
  const page = parseInt(req.query.page, 10) || 1;
  const limit = parseInt(req.query.limit, 10) || 10;
  const startIndex = (page - 1) * limit;
  const endIndex = page * limit;
  const total = await Order.countDocuments(JSON.parse(queryStr));

  query = query.skip(startIndex).limit(limit);

  // Executing query
  const orders = await query;

  // Pagination result
  const pagination = {};

  if (endIndex < total) {
    pagination.next = {
      page: page + 1,
      limit
    };
  }

  if (startIndex > 0) {
    pagination.prev = {
      page: page - 1,
      limit
    };
  }

  res.status(200).json({
    success: true,
    count: orders.length,
    pagination,
    data: orders
  });
});

// @desc    Get single order
// @route   GET /api/v1/admin/orders/:id
// @access  Private/Admin
exports.getOrder = asyncHandler(async (req, res, next) => {
  const order = await Order.findById(req.params.id)
    .populate('user', 'name email')
    .populate('orderItems.product', 'name price images');

  if (!order) {
    return next(new ErrorResponse(`Order not found with id of ${req.params.id}`, 404));
  }

  res.status(200).json({
    success: true,
    data: order
  });
});

// @desc    Update order to delivered
// @route   PUT /api/v1/admin/orders/:id/deliver
// @access  Private/Admin
exports.updateOrderToDelivered = asyncHandler(async (req, res, next) => {
  const order = await Order.findById(req.params.id);

  if (!order) {
    return next(new ErrorResponse(`Order not found with id of ${req.params.id}`, 404));
  }

  if (order.isDelivered) {
    return next(new ErrorResponse('Order already delivered', 400));
  }

  order.isDelivered = true;
  order.deliveredAt = Date.now();
  order.status = 'delivered';

  const updatedOrder = await order.save();

  // Here you would typically send a delivery confirmation email

  res.status(200).json({
    success: true,
    data: updatedOrder
  });
});

// @desc    Update order status
// @route   PUT /api/v1/admin/orders/:id/status
// @access  Private/Admin
exports.updateOrderStatus = asyncHandler(async (req, res, next) => {
  const { status } = req.body;
  const validStatuses = ['pending', 'processing', 'shipped', 'delivered', 'cancelled'];

  if (!validStatuses.includes(status)) {
    return next(new ErrorResponse(`Invalid status. Must be one of: ${validStatuses.join(', ')}`, 400));
  }

  const order = await Order.findById(req.params.id);

  if (!order) {
    return next(new ErrorResponse(`Order not found with id of ${req.params.id}`, 404));
  }

  // Prevent updating cancelled orders
  if (order.status === 'cancelled') {
    return next(new ErrorResponse('Cannot update a cancelled order', 400));
  }

  // Update status and set appropriate timestamps
  order.status = status;
  
  if (status === 'shipped' && !order.shippedAt) {
    order.shippedAt = Date.now();
  }
  
  if (status === 'delivered' && !order.deliveredAt) {
    order.deliveredAt = Date.now();
    order.isDelivered = true;
  }

  const updatedOrder = await order.save();

  // Here you would typically send a status update email

  res.status(200).json({
    success: true,
    data: updatedOrder
  });
});

// @desc    Get order statistics
// @route   GET /api/v1/admin/orders/stats
// @access  Private/Admin
exports.getOrderStats = asyncHandler(async (req, res, next) => {
  const stats = await Order.aggregate([
    {
      $match: { isPaid: true }
    },
    {
      $group: {
        _id: { $dateToString: { format: '%Y-%m', date: '$createdAt' } },
        numOrders: { $sum: 1 },
        totalSales: { $sum: '$totalPrice' }
      }
    },
    {
      $sort: { _id: 1 }
    }
  ]);

  res.status(200).json({
    success: true,
    count: stats.length,
    data: stats
  });
});

// @desc    Get sales statistics
// @route   GET /api/v1/admin/sales
// @access  Private/Admin
exports.getSalesStats = asyncHandler(async (req, res, next) => {
  const { startDate, endDate } = req.query;
  
  const match = { isPaid: true };
  
  if (startDate || endDate) {
    match.createdAt = {};
    if (startDate) match.createdAt.$gte = new Date(startDate);
    if (endDate) match.createdAt.$lte = new Date(endDate);
  }

  const stats = await Order.aggregate([
    {
      $match: match
    },
    {
      $group: {
        _id: {
          year: { $year: '$createdAt' },
          month: { $month: '$createdAt' },
          day: { $dayOfMonth: '$createdAt' }
        },
        totalSales: { $sum: '$totalPrice' },
        numOrders: { $sum: 1 },
        avgOrderValue: { $avg: '$totalPrice' }
      }
    },
    {
      $sort: { '_id.year': 1, '_id.month': 1, '_id.day': 1 }
    },
    {
      $project: {
        _id: 0,
        date: {
          $dateToString: {
            format: '%Y-%m-%d',
            date: {
              $dateFromParts: {
                year: '$_id.year',
                month: '$_id.month',
                day: '$_id.day'
              }
            }
          }
        },
        totalSales: 1,
        numOrders: 1,
        avgOrderValue: 1
      }
    }
  ]);

  res.status(200).json({
    success: true,
    count: stats.length,
    data: stats
  });
});

// @desc    Get dashboard statistics
// @route   GET /api/v1/admin/dashboard-stats
// @access  Private/Admin
exports.getDashboardStats = asyncHandler(async (req, res, next) => {
  // Get total sales
  const totalSales = await Order.aggregate([
    {
      $match: { isPaid: true }
    },
    {
      $group: {
        _id: null,
        total: { $sum: '$totalPrice' },
        count: { $sum: 1 }
      }
    }
  ]);

  // Get monthly sales
  const monthlySales = await Order.aggregate([
    {
      $match: {
        isPaid: true,
        createdAt: {
          $gte: new Date(new Date().setDate(new Date().getDate() - 30))
        }
      }
    },
    {
      $group: {
        _id: { $dateToString: { format: '%Y-%m-%d', date: '$createdAt' } },
        totalSales: { $sum: '$totalPrice' },
        numOrders: { $sum: 1 }
      }
    },
    {
      $sort: { _id: 1 }
    }
  ]);

  // Get top selling products
  const topProducts = await Order.aggregate([
    {
      $match: { isPaid: true }
    },
    { $unwind: '$orderItems' },
    {
      $group: {
        _id: '$orderItems.product',
        name: { $first: '$orderItems.name' },
        count: { $sum: '$orderItems.quantity' },
        revenue: { $sum: { $multiply: ['$orderItems.price', '$orderItems.quantity'] } }
      }
    },
    {
      $sort: { count: -1 }
    },
    {
      $limit: 5
    },
    {
      $lookup: {
        from: 'products',
        localField: '_id',
        foreignField: '_id',
        as: 'product'
      }
    },
    {
      $unwind: '$product'
    },
    {
      $project: {
        _id: 1,
        name: 1,
        count: 1,
        revenue: 1,
        image: { $arrayElemAt: ['$product.images', 0] }
      }
    }
  ]);

  // Get order status counts
  const orderStatusCounts = await Order.aggregate([
    {
      $group: {
        _id: '$status',
        count: { $sum: 1 }
      }
    },
    {
      $project: {
        status: '$_id',
        count: 1,
        _id: 0
      }
    }
  ]);

  // Get recent orders
  const recentOrders = await Order.find({})
    .sort({ createdAt: -1 })
    .limit(5)
    .populate('user', 'name email')
    .select('totalPrice isPaid isDelivered createdAt');

  res.status(200).json({
    success: true,
    data: {
      totalSales: totalSales[0]?.total || 0,
      totalOrders: totalSales[0]?.count || 0,
      monthlySales,
      topProducts,
      orderStatusCounts,
      recentOrders
    }
  });
});

// Product and Order controller methods would follow the same pattern as above
// I can help implement those if you'd like to proceed with them next
