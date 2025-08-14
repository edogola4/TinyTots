const express = require('express');
const router = express.Router();
const { protect, authorize } = require('../middleware/auth');
const { upload } = require('../utils/fileUpload');

// Import admin controllers
const {
  // User controllers
  getUsers,
  getUser,
  createUser,
  updateUser,
  deleteUser,
  
  // Product controllers
  getProducts,
  createProduct,
  updateProduct,
  deleteProduct,
  productPhotoUpload,
  
  // Order controllers
  getOrders,
  getOrder,
  updateOrderToDelivered,
  updateOrderStatus,
  getOrderStats,
  getSalesStats,
  
  // Dashboard controllers
  getDashboardStats
} = require('../controllers/admin');

// Protect all routes with admin access
router.use(protect);
router.use(authorize('admin'));

// User routes
router.route('/users')
  .get(getUsers)
  .post(createUser);

router.route('/users/:id')
  .get(getUser)
  .put(updateUser)
  .delete(deleteUser);

// Product routes
router.route('/products')
  .get(getProducts)
  .post(createProduct);

router.route('/products/:id')
  .put(updateProduct)
  .delete(deleteProduct);

// Product photo upload
router.route('/products/:id/photo')
  .put(upload.single('file'), productPhotoUpload);

// Order routes
router.route('/orders')
  .get(getOrders);

router.route('/orders/stats')
  .get(getOrderStats);

router.route('/orders/sales')
  .get(getSalesStats);

router.route('/orders/:id')
  .get(getOrder);

router.route('/orders/:id/deliver')
  .put(updateOrderToDelivered);

router.route('/orders/:id/status')
  .put(updateOrderStatus);

// Dashboard route
router.route('/dashboard-stats')
  .get(getDashboardStats);

module.exports = router;
