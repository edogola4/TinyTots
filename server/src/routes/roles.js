const express = require('express');
const router = express.Router();
const {
  getRoles,
  getRole,
  createRole,
  updateRole,
  deleteRole,
  getUsersWithRole,
  initializeRoles
} = require('../controllers/roleController');

const { protect, authorize } = require('../middleware/auth');
const advancedResults = require('../middleware/advancedResults');
const Role = require('../models/Role');

// All routes below this middleware are protected and require admin access
router.use(protect);
router.use(authorize('admin'));

router
  .route('/')
  .get(advancedResults(Role), getRoles)
  .post(createRole);

router
  .route('/:id')
  .get(getRole)
  .put(updateRole)
  .delete(deleteRole);

router.get('/:id/users', getUsersWithRole);

// Initialize default roles (admin, editor, viewer)
router.get('/init/roles', initializeRoles);

module.exports = router;
