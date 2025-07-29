import React from 'react';
import { Moon, Sun } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

export default function ThemeSwitcher() {
  const { theme, setTheme } = useTheme();

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  return (
    <button
      onClick={toggleTheme}
      aria-label="Toggle theme"
      className="relative p-2 rounded-full bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm shadow-sm hover:bg-white dark:hover:bg-slate-800 transition-colors touch-manipulation"
    >
      <span className="relative block w-5 h-5">
        <Sun className="absolute h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0 text-slate-600 dark:text-slate-400" />
        <Moon className="absolute h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100 text-slate-600 dark:text-slate-400" />
      </span>
    </button>
  );
}
