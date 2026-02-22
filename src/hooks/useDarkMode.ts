import { useCallback, useEffect, useMemo, useState } from 'react';
import { ThemeMode } from '../types';

export const useDarkMode = () => {
  const [theme, setThemeState] = useState<ThemeMode>(() => {
    const saved = localStorage.getItem('theme');
    return (saved as ThemeMode) || 'light';
  });

  const getSystemTheme = useCallback(
    (): 'light' | 'dark' =>
      window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light',
    []
  );

  const actualTheme = useMemo((): 'light' | 'dark' => {
    if (theme === 'system') {
      return getSystemTheme();
    }
    return theme;
  }, [theme, getSystemTheme]);

  useEffect(() => {
    const root = window.document.documentElement;
    root.classList.toggle('dark', actualTheme === 'dark');
    localStorage.setItem('theme', theme);
  }, [actualTheme, theme]);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');

    const handleChange = () => {
      if (theme === 'system') {
        const root = window.document.documentElement;
        root.classList.toggle('dark', getSystemTheme() === 'dark');
      }
    };

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, [theme, getSystemTheme]);

  const setThemeMode = (nextTheme: ThemeMode) => {
    setThemeState(nextTheme);
  };

  const toggleTheme = () => {
    setThemeState((previousTheme) => {
      if (previousTheme === 'light') return 'dark';
      if (previousTheme === 'dark') return 'system';
      return 'light';
    });
  };

  return { theme, setThemeMode, toggleTheme, isDarkMode: actualTheme === 'dark' };
};
