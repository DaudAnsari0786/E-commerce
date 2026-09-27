import React, { createContext, useContext, useEffect, useState, useCallback } from 'react';

const ThemeContext = createContext(null);
const PREFS_KEY = 'stylecraft:settings';

export const ThemeProvider = ({ children }) => {
  const [darkMode, setDarkMode] = useState(() => {
    try {
      const raw = localStorage.getItem(PREFS_KEY);
      const prefs = raw ? JSON.parse(raw) : {};
      return !!prefs.darkMode;
    } catch {
      return false;
    }
  });

  useEffect(() => {
    const root = document.documentElement;
    if (darkMode) root.classList.add('dark');
    else root.classList.remove('dark');

    try {
      const raw = localStorage.getItem(PREFS_KEY);
      const prefs = raw ? JSON.parse(raw) : {};
      localStorage.setItem(PREFS_KEY, JSON.stringify({ ...prefs, darkMode }));
    } catch { /* ignore */ }
  }, [darkMode]);

  const toggleTheme = useCallback(() => setDarkMode((d) => !d), []);

  return (
    <ThemeContext.Provider value={{ darkMode, setDarkMode, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error('useTheme must be used inside <ThemeProvider>');
  return ctx;
};

export default ThemeContext;