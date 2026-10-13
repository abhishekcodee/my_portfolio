import React, { useEffect, useState } from 'react';
import { ThemeContext } from './ThemeContext';

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState(() => {
    const saved = localStorage.getItem('abhishek_portfolio_theme');
    if (saved) return saved;
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'dark';
  });

  useEffect(() => {
    const root = document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
      root.classList.remove('light');
    } else {
      root.classList.remove('dark');
      root.classList.add('light');
    }
    localStorage.setItem('abhishek_portfolio_theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));
  };

  const isDarkMode = theme === 'dark';
  const setIsDarkMode = (val) => {
    if (typeof val === 'function') {
      setTheme((prev) => (val(prev === 'dark') ? 'dark' : 'light'));
    } else {
      setTheme(val ? 'dark' : 'light');
    }
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, isDarkMode, setIsDarkMode, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
