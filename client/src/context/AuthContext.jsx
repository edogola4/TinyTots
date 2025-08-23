import React, { createContext, useContext, useState, useEffect } from 'react';
import { login as loginService, register as registerService, getCurrentUser, logout as logoutService } from '../services/authService';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadUser = async () => {
      try {
        const token = localStorage.getItem('token');
        if (token) {
          const userData = await getCurrentUser();
          setUser(userData);
        }
      } catch (error) {
        console.error('Failed to load user', error);
        localStorage.removeItem('token');
      } finally {
        setLoading(false);
      }
    };

    loadUser();
  }, []);

  const login = async (email, password) => {
    try {
      setError(null);
      setLoading(true);
      console.log('AuthContext: Attempting to login with:', email);
      const data = await loginService(email, password);
      console.log('AuthContext: Login response received:', data);
      
      if (!data || !data.token) {
        throw new Error('No token received from server');
      }
      
      localStorage.setItem('token', data.token);
      
      // Always fetch fresh user data after login to ensure consistency
      const userData = await getCurrentUser();
      console.log('AuthContext: Fetched user data:', userData);
      
      if (!userData) {
        throw new Error('Failed to load user data');
      }
      
      setUser(userData);
      return { ...data, user: userData }; // Ensure user data is included in the response
    } catch (error) {
      console.error('AuthContext: Login error:', error);
      localStorage.removeItem('token'); // Clear invalid token
      setError(error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const register = async (userData) => {
    try {
      setError(null);
      const data = await registerService(userData);
      localStorage.setItem('token', data.token);
      setUser(data.user);
      return data;
    } catch (error) {
      setError(error);
      throw error;
    }
  };

  const logout = () => {
    logoutService();
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        error,
        login,
        register,
        logout,
        isAuthenticated: !!user,
      }}
    >
      {!loading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
