import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useRoutes } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { AuthProvider, useAuth } from './context/AuthContext';
import AdminLayout from './layouts/AdminLayout';
import Dashboard from './pages/Admin/Dashboard';
import Users from './pages/Admin/Users';
import Products from './pages/Admin/Products';
import Orders from './pages/Admin/Orders';
import Roles from './pages/Admin/Roles';
import Login from './pages/Login';
import Register from './pages/Register';

const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#dc004e',
    },
  },
});

// Protected Route component
const ProtectedRoute = ({ children }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

// Admin Routes
const AdminRoutes = () => {
  return useRoutes([{
    path: '/',
    element: (
      <ProtectedRoute>
        <AdminLayout />
      </ProtectedRoute>
    ),
    children: [
      { path: '', element: <Dashboard /> },
      { path: 'dashboard', element: <Dashboard /> },
      { path: 'users', element: <Users /> },
      { path: 'products', element: <Products /> },
      { path: 'orders', element: <Orders /> },
      { path: 'roles', element: <Roles /> },
      { path: 'roles/:id', element: <Roles /> },
    ],
  }]);
};

function AppContent() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/admin/*" element={<AdminRoutes />} />
        <Route path="/" element={<Navigate to="/admin/dashboard" replace />} />
      </Routes>
    </Router>
  );
}

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AuthProvider>
        <AppContent />
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;