import React, { Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { CircularProgress, Box } from '@mui/material';
import { AuthProvider, useAuth } from './context/AuthContext';
import { NotificationProvider } from './context/NotificationContext';
import { AppThemeProvider } from './theme/ThemeProvider';

// Lazy load components
const Login = React.lazy(() => import('./pages/Login'));
const Register = React.lazy(() => import('./pages/Register'));
const Home = React.lazy(() => import('./pages/Home'));
const AdminLayout = React.lazy(() => import('./layouts/AdminLayout'));
const Dashboard = React.lazy(() => import('./pages/Admin/Dashboard'));
const Users = React.lazy(() => import('./pages/Admin/Users'));
const Products = React.lazy(() => import('./pages/Admin/Products'));
const Orders = React.lazy(() => import('./pages/Admin/Orders'));
const Categories = React.lazy(() => import('./pages/Admin/Categories'));
const Roles = React.lazy(() => import('./pages/Admin/Roles'));
const Settings = React.lazy(() => import('./pages/Admin/Settings'));
const Page404 = React.lazy(() => import('./pages/Page404'));

// Loader component
const Loader = () => (
  <Box 
    display="flex" 
    justifyContent="center" 
    alignItems="center" 
    minHeight="100vh"
    bgcolor="background.default"
  >
    <CircularProgress />
  </Box>
);

// Protected route component
const ProtectedRoute = ({ children, requiredRoles = [] }) => {
  const { user, loading } = useAuth();
  
  if (loading) {
    return <Loader />;
  }

  if (!user) {
    return <Navigate to="/login" state={{ from: window.location.pathname }} replace />;
  }

  // Check if user has required role
  if (requiredRoles.length > 0 && !requiredRoles.includes(user.role)) {
    // If user is not authorized, redirect to home or dashboard based on role
    const redirectPath = user.role === 'admin' ? '/admin/dashboard' : '/';
    return <Navigate to={redirectPath} replace />;
  }

  return children;
};

// App content component
const AppContent = () => (
  <Router>
    <AuthProvider>
      <NotificationProvider>
        <Routes>
          <Route path="/login" element={
            <Suspense fallback={<Loader />}>
              <Login />
            </Suspense>
          } />
          <Route path="/register" element={
            <Suspense fallback={<Loader />}>
              <Register />
            </Suspense>
          } />
          
          {/* Public routes */}
          <Route path="/" element={
            <Suspense fallback={<Loader />}>
              <Home />
            </Suspense>
          } />
          
          {/* Admin routes */}
          <Route path="/admin" element={
            <ProtectedRoute>
              <Suspense fallback={<Loader />}>
                <AdminLayout />
              </Suspense>
            </ProtectedRoute>
          }>
            <Route index element={
              <Suspense fallback={<Loader />}>
                <Dashboard />
              </Suspense>
            } />
            <Route path="dashboard" element={
              <Suspense fallback={<Loader />}>
                <Dashboard />
              </Suspense>
            } />
            <Route path="users" element={
              <Suspense fallback={<Loader />}>
                <Users />
              </Suspense>
            } />
            <Route path="products" element={
              <Suspense fallback={<Loader />}>
                <Products />
              </Suspense>
            } />
            <Route path="orders" element={
              <Suspense fallback={<Loader />}>
                <Orders />
              </Suspense>
            } />
            <Route path="categories" element={
              <Suspense fallback={<Loader />}>
                <Categories />
              </Suspense>
            } />
            <Route path="roles" element={
              <ProtectedRoute requiredRoles={['admin']}>
                <Suspense fallback={<Loader />}>
                  <Roles />
                </Suspense>
              </ProtectedRoute>
            } />
            <Route path="settings" element={
              <Suspense fallback={<Loader />}>
                <Settings />
              </Suspense>
            } />
          </Route>
          
          <Route path="*" element={
            <Suspense fallback={<Loader />}>
              <Page404 />
            </Suspense>
          } />
        </Routes>
      </NotificationProvider>
    </AuthProvider>
  </Router>
);

// Main App component
function App() {
  return (
    <AppThemeProvider>
      <AppContent />
    </AppThemeProvider>
  );
}

export default App;