import React from 'react';
import { Sun, Moon } from 'lucide-react';
import { useTheme } from '../../context/useTheme';
import { motion } from 'framer-motion';

export const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <button
      onClick={toggleTheme}
      aria-label={`Switch to ${isDark ? 'light' : 'dark'} mode`}
      className="relative p-2.5 rounded-xl border border-slate-700/60 dark:border-slate-800 light:border-slate-300 bg-slate-900/50 dark:bg-slate-900/80 light:bg-white text-slate-300 dark:text-slate-200 light:text-slate-700 hover:text-cyan-400 dark:hover:text-cyan-400 light:hover:text-indigo-600 transition-all duration-300 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-cyan-500/50"
    >
      <motion.div
        initial={false}
        animate={{ rotate: isDark ? 0 : 180, scale: [0.8, 1] }}
        transition={{ duration: 0.3 }}
        className="flex items-center justify-center"
      >
        {isDark ? (
          <Sun className="w-5 h-5 text-amber-400" />
        ) : (
          <Moon className="w-5 h-5 text-indigo-600" />
        )}
      </motion.div>
    </button>
  );
};
