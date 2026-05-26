import React, { createContext, useState, useEffect, useCallback } from 'react';
import storageService from '../services/storageService.js';
import { THEMES } from '../constants/categories.js';

export const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [theme, setThemeState] = useState(THEMES.DARK);
  const [isLoading, setIsLoading] = useState(true);

  // Initialize from localStorage on mount
  useEffect(() => {
    try {
      const savedTheme = storageService.getTheme();
      setThemeState(savedTheme);
      applyTheme(savedTheme);
    } catch (error) {
      console.error('Error loading theme:', error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const applyTheme = (theme) => {
    const root = document.documentElement;
    if (theme === THEMES.DARK) {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  };

  const setTheme = useCallback((newTheme) => {
    setThemeState(newTheme);
    applyTheme(newTheme);
    storageService.setTheme(newTheme);
  }, []);

  const toggleTheme = useCallback(() => {
    const newTheme = theme === THEMES.DARK ? THEMES.LIGHT : THEMES.DARK;
    setTheme(newTheme);
  }, [theme, setTheme]);

  const value = {
    theme,
    setTheme,
    toggleTheme,
    isDark: theme === THEMES.DARK,
    isLight: theme === THEMES.LIGHT,
    isLoading,
  };

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
};
