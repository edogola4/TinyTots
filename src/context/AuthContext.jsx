import React, { createContext, useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // Set auth token in axios headers
  const setAuthToken = (token) => {
    if (token) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    } else {
      delete axios.defaults.headers.common['Authorization'];
    }
  };

  // Load user data
  const loadUser = async () => {
    try {
      const res = await axios.get('/api/auth/me');
      setUser(res.data);
    } catch (err) {
      console.error('Error loading user', err);
      logout();
    } finally {
      setLoading(false);
    }
  };

  // Register user
  const register = async (formData) => {
    try {
      const res = await axios.post('/api/auth/register', formData);
      const { token, user } = res.data;
      
      localStorage.setItem('token', token);
      setToken(token);
      setUser(user);
      setAuthToken(token);
      
      toast.success('Registration successful!');
      return true;
    } catch (err) {
      const error = err.response?.data?.error || 'Registration failed';
      toast.error(error);
      throw new Error(error);
    }
  };

  // Login user
  const login = async (email, password) => {
    try {
      const res = await axios.post('/api/auth/login', { email, password });
      const { token, user } = res.data;
      
      localStorage.setItem('token', token);
      setToken(token);
      setUser(user);
      setAuthToken(token);
      
      toast.success('Login successful!');
      return true;
    } catch (err) {
      const error = err.response?.data?.error || 'Login failed';
      toast.error(error);
      throw new Error(error);
    }
  };

  // Logout user
  const logout = () => {
    localStorage.removeItem('token');
    setToken(null);
    setUser(null);
    setAuthToken(null);
    navigate('/login');
  };

  // Check if user is authenticated
  const isAuthenticated = () => {
    return !!token;
  };

  // Check if user is admin
  const isAdmin = () => {
    return user?.role === 'admin';
  };

  // Initialize auth state
  useEffect(() => {
    if (token) {
      setAuthToken(token);
      loadUser();
    } else {
      setLoading(false);
    }
  }, [token]);

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        loading,
        register,
        login,
        logout,
        isAuthenticated,
        isAdmin,
      }}
    >
      {!loading && children}
    </AuthContext.Provider>
  );
};

// Custom hook to use auth context
const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export { AuthProvider, useAuth };
