import api from './axios';

// Get all roles
export const getRoles = async (params = {}) => {
  const response = await api.get('/roles', { params });
  return response.data;
};

// Get single role by ID
export const getRole = async (roleId) => {
  const response = await api.get(`/roles/${roleId}`);
  return response.data;
};

// Create a new role
export const createRole = async (roleData) => {
  const response = await api.post('/roles', roleData);
  return response.data;
};

// Update a role
export const updateRole = async (roleId, roleData) => {
  const response = await api.put(`/roles/${roleId}`, roleData);
  return response.data;
};

// Delete a role
export const deleteRole = async (roleId) => {
  const response = await api.delete(`/roles/${roleId}`);
  return response.data;
};

// Get users with a specific role
export const getUsersWithRole = async (roleId) => {
  const response = await api.get(`/roles/${roleId}/users`);
  return response.data;
};

// Initialize default roles
export const initializeRoles = async () => {
  const response = await api.get('/roles/init/roles');
  return response.data;
};

// Get all permissions
export const getPermissions = () => {
  return [
    // User Management
    { id: 'viewUsers', name: 'View Users', category: 'User Management' },
    { id: 'createUsers', name: 'Create Users', category: 'User Management' },
    { id: 'editUsers', name: 'Edit Users', category: 'User Management' },
    { id: 'deleteUsers', name: 'Delete Users', category: 'User Management' },
    
    // Product Management
    { id: 'viewProducts', name: 'View Products', category: 'Product Management' },
    { id: 'createProducts', name: 'Create Products', category: 'Product Management' },
    { id: 'editProducts', name: 'Edit Products', category: 'Product Management' },
    { id: 'deleteProducts', name: 'Delete Products', category: 'Product Management' },
    
    // Order Management
    { id: 'viewOrders', name: 'View Orders', category: 'Order Management' },
    { id: 'updateOrderStatus', name: 'Update Order Status', category: 'Order Management' },
    { id: 'processRefunds', name: 'Process Refunds', category: 'Order Management' },
    
    // Content Management
    { id: 'manageContent', name: 'Manage Content', category: 'Content Management' },
    
    // System Settings
    { id: 'manageSettings', name: 'Manage Settings', category: 'System' },
  ];
};
