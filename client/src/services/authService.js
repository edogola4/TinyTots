import api from '../config/axios';

export const login = async (email, password) => {
  try {
    const response = await api.post('/auth/login', { email, password });
    return response.data;
  } catch (error) {
    throw error.response?.data?.message || 'Login failed. Please try again.';
  }
};

export const register = async (userData) => {
  try {
    console.log('Sending registration request with:', userData);
    const response = await api.post('/auth/register', userData);
    console.log('Registration response:', response.data);
    return response.data;
  } catch (error) {
    console.error('Registration error details:', {
      status: error.response?.status,
      statusText: error.response?.statusText,
      data: error.response?.data,
      message: error.message
    });
    const errorMessage = error.response?.data?.message || 
                       error.response?.data?.error ||
                       'Registration failed. Please try again.';
    throw new Error(errorMessage);
  }
};

export const getCurrentUser = async () => {
  try {
    console.log('Fetching current user...');
    const response = await api.get('/auth/me');
    console.log('Current user data:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error fetching current user:', {
      status: error.response?.status,
      statusText: error.response?.statusText,
      data: error.response?.data,
      message: error.message
    });
    throw new Error(error.response?.data?.message || 'Failed to fetch user data');
  }
};

export const logout = () => {
  localStorage.removeItem('token');
  delete api.defaults.headers.common['Authorization'];
};
