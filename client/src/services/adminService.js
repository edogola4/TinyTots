import axios from 'axios';
import { API_URL } from '../config';

// Create axios instance with base URL
const api = axios.create({
  baseURL: API_URL,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add a request interceptor to include the auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// User Management
export const getUsers = async () => {
  const response = await api.get('/admin/users');
  return response.data;
};

export const getUser = async (userId) => {
  const response = await api.get(`/admin/users/${userId}`);
  return response.data;
};

export const updateUser = async (userId, userData) => {
  const response = await api.put(`/admin/users/${userId}`, userData);
  return response.data;
};

export const deleteUser = async (userId) => {
  const response = await api.delete(`/admin/users/${userId}`);
  return response.data;
};

// Product Management
export const getProducts = async (params = {}) => {
  const response = await api.get('/admin/products', { params });
  return response.data;
};

export const createProduct = async (productData) => {
  const response = await api.post('/admin/products', productData);
  return response.data;
};

export const updateProduct = async (productId, productData) => {
  const response = await api.put(`/admin/products/${productId}`, productData);
  return response.data;
};

export const deleteProduct = async (productId) => {
  const response = await api.delete(`/admin/products/${productId}`);
  return response.data;
};

export const uploadProductPhoto = async (productId, file) => {
  const formData = new FormData();
  formData.append('file', file);
  
  const response = await api.put(
    `/admin/products/${productId}/photo`,
    formData,
    {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    }
  );
  return response.data;
};

// Order Management
export const getOrders = async (params = {}) => {
  const response = await api.get('/admin/orders', { params });
  return response.data;
};

export const getOrder = async (orderId) => {
  const response = await api.get(`/admin/orders/${orderId}`);
  return response.data;
};

export const updateOrderStatus = async (orderId, status) => {
  const response = await api.put(`/admin/orders/${orderId}/status`, { status });
  return response.data;
};

export const updateOrderToDelivered = async (orderId) => {
  const response = await api.put(`/admin/orders/${orderId}/deliver`);
  return response.data;
};

// Dashboard
export const getDashboardStats = async () => {
  const response = await api.get('/admin/dashboard-stats');
  return response.data;
};

export const getOrderStats = async (params = {}) => {
  const response = await api.get('/admin/orders/stats', { params });
  return response.data;
};

export const getSalesStats = async (params = {}) => {
  const response = await api.get('/admin/orders/sales', { params });
  return response.data;
};
