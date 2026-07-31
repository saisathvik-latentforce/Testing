import React, { createContext, useState, useMemo } from 'react';
import PropTypes from 'prop-types';

import { lightTheme, darkTheme } from '../assets/theme';

export const ThemeContext = createContext({ mode: 'light', toggleTheme: () => {} });

const STORAGE_KEY = 'cuppacart_theme';

export const ThemeContextProvider = ({ children }) => {
  const [mode, setMode] = useState(() => localStorage.getItem(STORAGE_KEY) || 'light');

  const toggleTheme = () => {
    setMode(prev => {
      const next = prev === 'light' ? 'dark' : 'light';
      localStorage.setItem(STORAGE_KEY, next);
      return next;
    });
  };

  const theme = useMemo(() => (mode === 'dark' ? darkTheme : lightTheme), [mode]);

  return (
    <ThemeContext.Provider value={{ mode, toggleTheme, theme }}>{children}</ThemeContext.Provider>
  );
};

ThemeContextProvider.propTypes = { children: PropTypes.node.isRequired };
