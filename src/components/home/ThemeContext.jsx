'use client';
import { createContext, useContext, useState, useEffect } from 'react';

const ThemeContext = createContext();

const colorThemes = {
  modern: {
    primary: 'bg-gradient-to-r from-blue-500 to-cyan-500',
    secondary: 'bg-blue-50',
    text: 'text-gray-800',
    accent: 'text-blue-600',
    badge: 'bg-blue-500',
    button: 'bg-blue-600 hover:bg-blue-700',
    header: {
      bg: 'bg-white/80 backdrop-blur-lg border-b border-blue-100',
      text: 'text-blue-700',
      hover: 'hover:text-blue-600',
    },
  },
  professional: {
    primary: 'bg-gradient-to-r from-gray-700 to-gray-900',
    secondary: 'bg-gray-100',
    text: 'text-gray-800',
    accent: 'text-gray-700',
    badge: 'bg-gray-600',
    button: 'bg-gray-700 hover:bg-gray-800',
    header: {
      bg: 'bg-white/70 backdrop-blur-md border-b border-gray-200',
      text: 'text-gray-800',
      hover: 'hover:text-gray-700',
    },
  },
  vibrant: {
    primary: 'bg-gradient-to-r from-purple-500 to-pink-500',
    secondary: 'bg-purple-50',
    text: 'text-gray-800',
    accent: 'text-purple-600',
    badge: 'bg-purple-500',
    button: 'bg-purple-600 hover:bg-purple-700',
    header: {
      bg: 'bg-white/85 backdrop-blur-xl border-b border-purple-100',
      text: 'text-purple-700',
      hover: 'hover:text-purple-600',
    },
  },
  nature: {
    primary: 'bg-gradient-to-r from-green-500 to-emerald-500',
    secondary: 'bg-green-50',
    text: 'text-gray-800',
    accent: 'text-green-600',
    badge: 'bg-green-500',
    button: 'bg-green-600 hover:bg-green-700',
    header: {
      bg: 'bg-white/80 backdrop-blur-lg border-b border-green-100',
      text: 'text-green-700',
      hover: 'hover:text-green-600',
    },
  },
};

export function ThemeProvider({ children }) {
  const [currentTheme, setCurrentTheme] = useState('professional');

  // Load saved theme from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('theme');
    if (saved) setCurrentTheme(saved);
  }, []);

  // Save theme to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('theme', currentTheme);
  }, [currentTheme]);

  const theme = colorThemes[currentTheme];

  return (
    <ThemeContext.Provider value={{ currentTheme, setCurrentTheme, theme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export const useTheme = () => useContext(ThemeContext);
