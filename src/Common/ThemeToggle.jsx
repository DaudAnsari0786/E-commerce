import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaMoon, FaSun } from 'react-icons/fa';
import { useTheme } from '../../context/ThemeContext';

const ThemeToggle = ({ className = '' }) => {
  const { darkMode, toggleTheme } = useTheme();

  return (
    <motion.button
      type="button"
      onClick={toggleTheme}
      aria-label={darkMode ? 'Switch to light mode' : 'Switch to dark mode'}
      title={darkMode ? 'Switch to light mode' : 'Switch to dark mode'}
      whileHover={{ scale: 1.08, rotate: 8 }}
      whileTap={{ scale: 0.94 }}
      transition={{ duration: 0.2, ease: 'easeInOut' }}
      className={`relative inline-flex items-center justify-center w-9 h-9 rounded-lg border border-gray-200 dark:border-slate-600 bg-white dark:bg-slate-800 text-gray-700 dark:text-slate-200 hover:bg-indigo-50 dark:hover:bg-slate-700 transition-colors duration-200 cursor-pointer ${className}`}
    >
      <AnimatePresence mode="wait" initial={false}>
        <motion.span
          key={darkMode ? 'moon' : 'sun'}
          initial={{ rotate: -90, opacity: 0, scale: 0.6 }}
          animate={{ rotate: 0, opacity: 1, scale: 1 }}
          exit={{ rotate: 90, opacity: 0, scale: 0.6 }}
          transition={{ duration: 0.2 }}
          className="absolute inline-flex items-center justify-center"
        >
          {darkMode ? (
            <FaMoon className="w-4 h-4" />
          ) : (
            <FaSun className="w-4 h-4" />
          )}
        </motion.span>
      </AnimatePresence>
    </motion.button>
  );
};

export default ThemeToggle;