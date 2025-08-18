import React, { createContext, useContext, useCallback, useState } from 'react';
import { Snackbar, Alert, AlertTitle } from '@mui/material';

const NotificationContext = createContext({});

const DEFAULT_OPTIONS = {
  position: {
    vertical: 'top',
    horizontal: 'right',
  },
  autoHideDuration: 6000,
  variant: 'filled',
  elevation: 6,
};

export const NotificationProvider = ({ children }) => {
  const [notification, setNotification] = useState({
    open: false,
    message: '',
    severity: 'info', // 'error', 'warning', 'info', 'success'
    title: '',
    options: {},
  });

  const showNotification = useCallback((message, severity = 'info', options = {}) => {
    setNotification({
      open: true,
      message,
      severity,
      title: options.title || '',
      options: { ...DEFAULT_OPTIONS, ...options },
    });
  }, []);

  const showSuccess = useCallback((message, options = {}) => {
    showNotification(message, 'success', { title: 'Success', ...options });
  }, [showNotification]);

  const showError = useCallback((message, options = {}) => {
    showNotification(message, 'error', { title: 'Error', ...options });
  }, [showNotification]);

  const showWarning = useCallback((message, options = {}) => {
    showNotification(message, 'warning', { title: 'Warning', ...options });
  }, [showNotification]);

  const showInfo = useCallback((message, options = {}) => {
    showNotification(message, 'info', { title: 'Info', ...options });
  }, [showNotification]);

  const handleClose = useCallback(() => {
    setNotification(prev => ({ ...prev, open: false }));
  }, []);

  return (
    <NotificationContext.Provider
      value={{
        showNotification,
        showSuccess,
        showError,
        showWarning,
        showInfo,
      }}
    >
      {children}
      <Snackbar
        open={notification.open}
        autoHideDuration={notification.options.autoHideDuration}
        onClose={handleClose}
        anchorOrigin={notification.options.position}
        sx={{ maxWidth: 400 }}
      >
        <Alert
          onClose={handleClose}
          severity={notification.severity}
          variant={notification.options.variant}
          elevation={notification.options.elevation}
          sx={{ width: '100%' }}
        >
          {notification.title && (
            <AlertTitle sx={{ fontWeight: 600 }}>
              {notification.title}
            </AlertTitle>
          )}
          {notification.message}
        </Alert>
      </Snackbar>
    </NotificationContext.Provider>
  );
};

export const useNotification = () => {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error('useNotification must be used within a NotificationProvider');
  }
  return context;
};

export default NotificationContext;
