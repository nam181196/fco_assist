import { useState, useEffect } from 'react';
import { getSystemConfig, updateSystemConfig } from '../services/localStorageService';

export const useThemeStore = () => {
  const [theme, setTheme] = useState(() => {
    const config = getSystemConfig();
    return config.theme_preference || 'dark';
  });

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    updateSystemConfig({ theme_preference: theme });
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => (prev === 'dark' ? 'light' : 'dark'));
  };

  return { theme, toggleTheme };
};
