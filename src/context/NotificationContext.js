import React, { createContext, useContext, useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import { Snackbar, Alert, Button } from '@mui/material';

const NotificationContext = createContext();

let uid = 0;

export const NotificationProvider = ({ children }) => {
  const [notifications, setNotifications] = useState([]);

  const dismiss = useCallback(id => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  }, []);

  const show = useCallback((severity, message, options = {}) => {
    const id = ++uid;
    const duration = options.undoFn ? 5000 : 3000;
    setNotifications(prev => {
      const next = [...prev, { id, severity, message, duration, undoFn: options.undoFn }];
      return next.slice(-3); // cap at 3
    });
    return id;
  }, []);

  const showSuccess = useCallback(msg => show('success', msg), [show]);
  const showError = useCallback(msg => show('error', msg), [show]);
  const showInfo = useCallback(msg => show('info', msg), [show]);
  const showWarning = useCallback((msg, undoFn) => show('warning', msg, { undoFn }), [show]);

  return (
    <NotificationContext.Provider value={{ showSuccess, showError, showInfo, showWarning }}>
      {children}
      {notifications.map((n, i) => (
        <Snackbar
          key={n.id}
          open
          autoHideDuration={n.duration}
          onClose={() => dismiss(n.id)}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
          sx={{ bottom: { xs: 72, sm: 24 }, mb: `${i * 64}px` }}
        >
          <Alert
            severity={n.severity}
            onClose={() => dismiss(n.id)}
            sx={{ width: '100%', alignItems: 'center' }}
            action={
              n.undoFn ? (
                <Button
                  color="inherit"
                  size="small"
                  onClick={() => {
                    n.undoFn();
                    dismiss(n.id);
                  }}
                >
                  UNDO
                </Button>
              ) : undefined
            }
          >
            {n.message}
          </Alert>
        </Snackbar>
      ))}
    </NotificationContext.Provider>
  );
};

NotificationProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export const useNotification = () => useContext(NotificationContext);
