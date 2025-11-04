'use client';
import { createContext, useContext, useState, useEffect } from 'react';

const ThemeContext = createContext();

const colorThemes = {
  default: { // Twitter Blue
    primary: 'bg-gradient-to-r from-blue-500 to-blue-600 animate-gradient-default',
    secondary: 'bg-blue-50',
    text: 'text-gray-900',
    accent: 'text-blue-600',
    badge: 'bg-blue-500',
    button: 'bg-blue-600 hover:bg-blue-700',
    header: {
      bg: 'bg-white/90 backdrop-blur-md border-b border-blue-100',
      text: 'text-blue-700',
      hover: 'hover:text-blue-600',
    },
  },
  dark: { // Dark Mode
    primary: 'bg-gray-900 animate-gradient-dark',
    secondary: 'bg-gray-800',
    text: 'text-gray-100',
    accent: 'text-blue-400',
    badge: 'bg-blue-500',
    button: 'bg-blue-600 hover:bg-blue-700',
    header: {
      bg: 'bg-gray-900/95 backdrop-blur-md border-b border-gray-700',
      text: 'text-white',
      hover: 'hover:text-blue-400',
    },
  },
  dim: { // Complete Black
    primary: 'bg-black',
    secondary: 'bg-black',
    text: 'text-white',
    accent: 'text-gray-400',
    badge: 'bg-gray-800',
    button: 'bg-gray-800 hover:bg-gray-900',
    header: {
      bg: 'bg-black/95 backdrop-blur-md border-b border-gray-800',
      text: 'text-white',
      hover: 'hover:text-gray-400',
    },
  },
};

export function ThemeProvider({ children }) {
  const [currentTheme, setCurrentTheme] = useState('default');

  // Load saved theme from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('theme');
    if (saved && (saved === 'default' || saved === 'dark' || saved === 'dim')) {
      setCurrentTheme(saved);
    }
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
