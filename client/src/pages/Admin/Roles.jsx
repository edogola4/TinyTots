import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Box, 
  Button, 
  Paper, 
  Table, 
  TableBody, 
  TableCell, 
  TableContainer, 
  TableHead, 
  TableRow, 
  Typography, 
  IconButton,
  TablePagination,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  FormGroup,
  FormControlLabel,
  Checkbox,
  Chip,
  Tooltip,
  Snackbar,
  Alert,
  Divider,
  Tabs,
  Tab,
  Grid,
  Card,
  CardContent,
  CardHeader,
  Avatar,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Menu,
  MenuItem
} from '@mui/material';
import { 
  Add as AddIcon, 
  Edit as EditIcon, 
  Delete as DeleteIcon,
  MoreVert as MoreVertIcon,
  People as PeopleIcon,
  Lock as LockIcon,
  CheckCircle as CheckCircleIcon,
  Cancel as CancelIcon,
  Info as InfoIcon
} from '@mui/icons-material';
import { 
  getRoles, 
  deleteRole, 
  initializeRoles, 
  getPermissions, 
  updateRole, 
  createRole 
} from '../../services/roleService';
import { getUsers } from '../../services/adminService';

const Roles = () => {
  const [roles, setRoles] = useState([]);
  const [users, setUsers] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [openDialog, setOpenDialog] = useState(false);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [selectedRole, setSelectedRole] = useState(null);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [tabValue, setTabValue] = useState(0);
  const [permissions, setPermissions] = useState([]);
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedRoleForMenu, setSelectedRoleForMenu] = useState(null);
  
  const navigate = useNavigate();
  const open = Boolean(anchorEl);

  // Fetch roles and users
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        
        // Fetch roles
        const rolesResponse = await getRoles();
        setRoles(rolesResponse.data || []);
        
        // Fetch users for user count
        const usersResponse = await getUsers();
        setUsers(usersResponse.data || []);
        
        // Get permissions list
        const permissionsList = getPermissions();
        setPermissions(permissionsList);
        
        setError('');
      } catch (err) {
        setError('Failed to load roles. Please try again.');
        console.error('Error fetching data:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Handle tab change
  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  // Handle role menu click
  const handleMenuClick = (event, role) => {
    setAnchorEl(event.currentTarget);
    setSelectedRoleForMenu(role);
  };

  // Handle menu close
  const handleMenuClose = () => {
    setAnchorEl(null);
    setSelectedRoleForMenu(null);
  };

  // Handle edit role
  const handleEditRole = (role) => {
    setSelectedRole(role);
    setOpenDialog(true);
    handleMenuClose();
  };

  // Handle delete role click
  const handleDeleteClick = (role) => {
    setSelectedRole(role);
    setOpenDeleteDialog(true);
    handleMenuClose();
  };

  // Handle delete role confirmation
  const handleDeleteConfirm = async () => {
    if (!selectedRole) return;
    
    try {
      await deleteRole(selectedRole._id);
      setRoles(roles.filter(role => role._id !== selectedRole._id));
      setSnackbar({
        open: true,
        message: 'Role deleted successfully',
        severity: 'success'
      });
    } catch (err) {
      setSnackbar({
        open: true,
        message: 'Failed to delete role',
        severity: 'error'
      });
    } finally {
      setOpenDeleteDialog(false);
      setSelectedRole(null);
    }
  };

  // Handle close snackbar
  const handleCloseSnackbar = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  // Handle page change
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  // Handle rows per page change
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  // Handle initialize default roles
  const handleInitializeRoles = async () => {
    try {
      setLoading(true);
      const response = await initializeRoles();
      setRoles(response.data || []);
      setSnackbar({
        open: true,
        message: 'Default roles initialized successfully',
        severity: 'success'
      });
    } catch (err) {
      setSnackbar({
        open: true,
        message: 'Failed to initialize roles',
        severity: 'error'
      });
    } finally {
      setLoading(false);
    }
  };

  // Get user count for a role
  const getUserCountForRole = (roleId) => {
    return users.filter(user => user.role === roleId).length;
  };

  // Check if role is a default role
  const isDefaultRole = (role) => {
    const defaultRoles = ['admin', 'editor', 'viewer'];
    return defaultRoles.includes(role.name);
  };

  return (
    <Box>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
        <Typography variant="h5">User Roles & Permissions</Typography>
        <Box>
          <Button 
            variant="contained" 
            color="primary" 
            startIcon={<AddIcon />}
            onClick={() => {
              setSelectedRole(null);
              setOpenDialog(true);
            }}
            sx={{ mr: 2 }}
          >
            Add Role
          </Button>
          <Button 
            variant="outlined" 
            color="primary"
            onClick={handleInitializeRoles}
            disabled={loading}
          >
            Initialize Default Roles
          </Button>
        </Box>
      </Box>

      {error && (
        <Alert severity="error" sx={{ mb: 3 }} onClose={() => setError('')}>
          {error}
        </Alert>
      )}

      <Paper sx={{ mb: 3 }}>
        <Tabs 
          value={tabValue} 
          onChange={handleTabChange}
          indicatorColor="primary"
          textColor="primary"
          variant="scrollable"
          scrollButtons="auto"
        >
          <Tab label="All Roles" />
          <Tab label="Default Roles" />
          <Tab label="Custom Roles" />
        </Tabs>
        <Divider />
        
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Role Name</TableCell>
                <TableCell>Description</TableCell>
                <TableCell>Users</TableCell>
                <TableCell>Permissions</TableCell>
                <TableCell>Status</TableCell>
                <TableCell align="right">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {loading ? (
                <TableRow>
                  <TableCell colSpan={6} align="center" sx={{ py: 4 }}>
                    Loading roles...
                  </TableCell>
                </TableRow>
              ) : roles.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} align="center" sx={{ py: 4 }}>
                    No roles found. Click "Initialize Default Roles" to get started.
                  </TableCell>
                </TableRow>
              ) : (
                roles
                  .filter(role => {
                    if (tabValue === 1) return isDefaultRole(role);
                    if (tabValue === 2) return !isDefaultRole(role);
                    return true;
                  })
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((role) => (
                    <TableRow key={role._id} hover>
                      <TableCell>
                        <Box display="flex" alignItems="center">
                          <LockIcon color="primary" sx={{ mr: 1 }} />
                          <Typography variant="subtitle2">
                            {role.name.charAt(0).toUpperCase() + role.name.slice(1)}
                          </Typography>
                          {isDefaultRole(role) && (
                            <Chip 
                              label="Default" 
                              size="small" 
                              color="primary" 
                              variant="outlined"
                              sx={{ ml: 1 }}
                            />
                          )}
                        </Box>
                      </TableCell>
                      <TableCell>
                        <Typography variant="body2" color="textSecondary">
                          {role.description || 'No description'}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Chip 
                          label={getUserCountForRole(role._id)} 
                          size="small" 
                          variant="outlined"
                        />
                      </TableCell>
                      <TableCell>
                        <Box display="flex" flexWrap="wrap" gap={0.5}>
                          {Object.entries(role.permissions || {})
                            .filter(([_, hasPermission]) => hasPermission)
                            .slice(0, 3)
                            .map(([permission]) => (
                              <Chip 
                                key={permission}
                                label={permission}
                                size="small"
                                color="primary"
                                variant="outlined"
                              />
                            ))}
                          {Object.values(role.permissions || {}).filter(Boolean).length > 3 && (
                            <Tooltip 
                              title={
                                <Box>
                                  {Object.entries(role.permissions || {})
                                    .filter(([_, hasPermission]) => hasPermission)
                                    .map(([permission]) => (
                                      <Box key={permission} sx={{ p: 0.5 }}>
                                        <Chip 
                                          label={permission}
                                          size="small"
                                          color="primary"
                                          variant="outlined"
                                        />
                                      </Box>
                                    ))}
                                </Box>
                              }
                              arrow
                              placement="right"
                            >
                              <Chip 
                                label={`+${Object.values(role.permissions || {}).filter(Boolean).length - 3} more`}
                                size="small"
                                variant="outlined"
                              />
                            </Tooltip>
                          )}
                        </Box>
                      </TableCell>
                      <TableCell>
                        <Chip 
                          icon={role.isActive ? <CheckCircleIcon /> : <CancelIcon />}
                          label={role.isActive ? 'Active' : 'Inactive'}
                          color={role.isActive ? 'success' : 'default'}
                          size="small"
                          variant="outlined"
                        />
                      </TableCell>
                      <TableCell align="right">
                        <IconButton
                          aria-label="more"
                          aria-controls="role-menu"
                          aria-haspopup="true"
                          onClick={(e) => handleMenuClick(e, role)}
                        >
                          <MoreVertIcon />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  ))
              )}
            </TableBody>
          </Table>
        </TableContainer>
        
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={roles.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>

      {/* Role Menu */}
      <Menu
        id="role-menu"
        anchorEl={anchorEl}
        keepMounted
        open={open}
        onClose={handleMenuClose}
      >
        <MenuItem onClick={() => {
          navigate(`/admin/roles/${selectedRoleForMenu?._id}`);
          handleMenuClose();
        }}>
          View Details
        </MenuItem>
        <MenuItem onClick={() => handleEditRole(selectedRoleForMenu)}>
          Edit Role
        </MenuItem>
        {!isDefaultRole(selectedRoleForMenu || {}) && (
          <MenuItem 
            onClick={() => handleDeleteClick(selectedRoleForMenu)}
            sx={{ color: 'error.main' }}
          >
            Delete Role
          </MenuItem>
        )}
      </Menu>

      {/* Delete Confirmation Dialog */}
      <Dialog
        open={openDeleteDialog}
        onClose={() => setOpenDeleteDialog(false)}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>Delete Role</DialogTitle>
        <DialogContent>
          <Alert severity="warning" sx={{ mb: 2 }}>
            <strong>Warning:</strong> This action cannot be undone.
          </Alert>
          <Typography>
            Are you sure you want to delete the role "{selectedRole?.name}"?
          </Typography>
          {getUserCountForRole(selectedRole?._id) > 0 && (
            <Alert severity="info" sx={{ mt: 2 }}>
              <strong>Note:</strong> There {getUserCountForRole(selectedRole?._id) === 1 ? 'is' : 'are'} currently {getUserCountForRole(selectedRole?._id)} user{getUserCountForRole(selectedRole?._id) === 1 ? '' : 's'} with this role.
            </Alert>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDeleteDialog(false)}>Cancel</Button>
          <Button 
            onClick={handleDeleteConfirm} 
            color="error"
            variant="contained"
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>

      {/* Role Form Dialog */}
      <RoleFormDialog 
        open={openDialog} 
        onClose={() => setOpenDialog(false)} 
        role={selectedRole}
        permissions={permissions}
        onSuccess={(newRole) => {
          if (selectedRole) {
            // Update existing role
            setRoles(roles.map(r => r._id === newRole._id ? newRole : r));
          } else {
            // Add new role
            setRoles([...roles, newRole]);
          }
          setOpenDialog(false);
        }}
      />

      {/* Snackbar */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        <Alert onClose={handleCloseSnackbar} severity={snackbar.severity}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

// Role Form Dialog Component
const RoleFormDialog = ({ open, onClose, role, permissions, onSuccess }) => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    isActive: true,
    permissions: {},
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  // Initialize form when role prop changes
  useEffect(() => {
    if (role) {
      setFormData({
        name: role.name,
        description: role.description || '',
        isActive: role.isActive !== false, // default to true if not set
        permissions: { ...(role.permissions || {}) },
      });
    } else {
      // Initialize with all permissions false for new role
      const initialPermissions = {};
      permissions.forEach(permission => {
        initialPermissions[permission.id] = false;
      });
      
      setFormData({
        name: '',
        description: '',
        isActive: true,
        permissions: initialPermissions,
      });
    }
    setErrors({});
  }, [role, permissions]);

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    
    if (type === 'checkbox') {
      setFormData(prev => ({
        ...prev,
        [name]: checked
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }

    // Clear error when field is edited
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: undefined
      }));
    }
  };

  // Handle permission toggle
  const handlePermissionChange = (permissionId) => (e) => {
    setFormData(prev => ({
      ...prev,
      permissions: {
        ...prev.permissions,
        [permissionId]: !prev.permissions[permissionId]
      }
    }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validate form
    const newErrors = {};
    if (!formData.name.trim()) {
      newErrors.name = 'Role name is required';
    }
    
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    try {
      setLoading(true);
      
      // Prepare role data
      const roleData = {
        name: formData.name.trim(),
        description: formData.description.trim(),
        isActive: formData.isActive,
        permissions: formData.permissions,
      };

      // Call API to create or update role
      let response;
      if (role) {
        response = await updateRole(role._id, roleData);
      } else {
        response = await createRole(roleData);
      }

      // Call success callback
      onSuccess(response.data);
      
      // Show success message
      return {
        success: true,
        message: role ? 'Role updated successfully' : 'Role created successfully'
      };
    } catch (err) {
      console.error('Error saving role:', err);
      
      // Handle API validation errors
      if (err.response?.data?.errors) {
        const apiErrors = {};
        Object.entries(err.response.data.errors).forEach(([field, message]) => {
          apiErrors[field] = message;
        });
        setErrors(apiErrors);
        return { success: false, message: 'Please fix the errors in the form' };
      }
      
      return { 
        success: false, 
        message: err.response?.data?.message || 'Failed to save role' 
      };
    } finally {
      setLoading(false);
    }
  };

  // Group permissions by category
  const permissionsByCategory = permissions.reduce((acc, permission) => {
    if (!acc[permission.category]) {
      acc[permission.category] = [];
    }
    acc[permission.category].push(permission);
    return acc;
  }, {});

  return (
    <Dialog 
      open={open} 
      onClose={onClose} 
      maxWidth="md" 
      fullWidth
      aria-labelledby="role-form-dialog-title"
    >
      <DialogTitle id="role-form-dialog-title">
        {role ? 'Edit Role' : 'Create New Role'}
      </DialogTitle>
      <form onSubmit={handleSubmit}>
        <DialogContent dividers>
          <Grid container spacing={3}>
            <Grid item xs={12} md={4}>
              <TextField
                autoFocus
                margin="dense"
                id="name"
                name="name"
                label="Role Name"
                type="text"
                fullWidth
                variant="outlined"
                value={formData.name}
                onChange={handleChange}
                error={!!errors.name}
                helperText={errors.name}
                disabled={loading || (role && ['admin', 'editor', 'viewer'].includes(role.name))}
                required
              />
              
              <TextField
                margin="dense"
                id="description"
                name="description"
                label="Description"
                type="text"
                fullWidth
                multiline
                rows={4}
                variant="outlined"
                value={formData.description}
                onChange={handleChange}
                error={!!errors.description}
                helperText={errors.description}
                disabled={loading}
              />
              
              <FormGroup>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={formData.isActive}
                      onChange={handleChange}
                      name="isActive"
                      color="primary"
                      disabled={loading || (role && ['admin', 'viewer'].includes(role.name))}
                    />
                  }
                  label="Active"
                />
              </FormGroup>
              
              <Box mt={2}>
                <Typography variant="subtitle2" color="textSecondary" gutterBottom>
                  <InfoIcon fontSize="small" sx={{ verticalAlign: 'middle', mr: 0.5 }} />
                  Role Status
                </Typography>
                <Typography variant="body2" color="textSecondary" paragraph>
                  {formData.isActive 
                    ? 'This role is active and can be assigned to users.' 
                    : 'This role is inactive and cannot be assigned to new users.'}
                </Typography>
              </Box>
            </Grid>
            
            <Grid item xs={12} md={8}>
              <Typography variant="subtitle1" gutterBottom>
                Permissions
              </Typography>
              <Typography variant="body2" color="textSecondary" paragraph>
                Select the permissions that members of this role should have.
              </Typography>
              
              <Paper variant="outlined" sx={{ p: 2, maxHeight: 400, overflow: 'auto' }}>
                {Object.entries(permissionsByCategory).map(([category, categoryPermissions]) => (
                  <Box key={category} mb={3}>
                    <Typography variant="subtitle2" color="primary" gutterBottom>
                      {category}
                    </Typography>
                    <Divider sx={{ mb: 2 }} />
                    <Grid container spacing={2}>
                      {categoryPermissions.map((permission) => (
                        <Grid item xs={12} sm={6} md={6} key={permission.id}>
                          <FormGroup>
                            <FormControlLabel
                              control={
                                <Checkbox
                                  checked={!!formData.permissions[permission.id]}
                                  onChange={handlePermissionChange(permission.id)}
                                  name={`permissions.${permission.id}`}
                                  color="primary"
                                  disabled={
                                    loading || 
                                    (role && ['admin', 'viewer'].includes(role.name) && 
                                      !['viewUsers', 'viewProducts', 'viewOrders'].includes(permission.id))
                                  }
                                />
                              }
                              label={
                                <Box>
                                  <Typography variant="body2">
                                    {permission.name}
                                  </Typography>
                                  <Typography variant="caption" color="textSecondary">
                                    {permission.id}
                                  </Typography>
                                </Box>
                              }
                            />
                          </FormGroup>
                        </Grid>
                      ))}
                    </Grid>
                  </Box>
                ))}
              </Paper>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions sx={{ p: 2 }}>
          <Button onClick={onClose} disabled={loading}>
            Cancel
          </Button>
          <Button 
            type="submit" 
            color="primary" 
            variant="contained" 
            disabled={loading}
          >
            {loading ? 'Saving...' : 'Save Role'}
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default Roles;
