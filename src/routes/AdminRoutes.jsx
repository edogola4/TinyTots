import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import AdminLayout from '../pages/admin/AdminLayout';
import AdminDashboard from '../pages/admin/AdminDashboard';
import AdminUsers from '../pages/admin/users/Users';
import AdminProducts from '../pages/admin/products/Products';
import AdminOrders from '../pages/admin/orders/Orders';
import AdminSettings from '../pages/admin/settings/Settings';

const AdminRoutes = () => {
  // Add authentication check here
  const isAuthenticated = true; // Replace with actual auth check
  const isAdmin = true; // Replace with actual role check

  if (!isAuthenticated || !isAdmin) {
    return <Navigate to="/login" />;
  }

  return (
    <AdminLayout>
      <Routes>
        <Route index element={<AdminDashboard />} />
        <Route path="dashboard" element={<AdminDashboard />} />
        <Route path="users/*" element={<AdminUsers />} />
        <Route path="products/*" element={<AdminProducts />} />
        <Route path="orders/*" element={<AdminOrders />} />
        <Route path="settings" element={<AdminSettings />} />
        <Route path="*" element={<Navigate to="/admin/dashboard" replace />} />
      </Routes>
    </AdminLayout>
  );
};

export default AdminRoutes;
