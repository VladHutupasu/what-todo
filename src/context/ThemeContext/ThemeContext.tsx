'use client'; // This is a client component 👈

import { ReactNode, createContext, useEffect, useState } from 'react';
import Loading from '../../app/loading';

type Props = {
  children: ReactNode;
};
export type Theme = 'light' | 'dark';
export type ThemeContextType = {
  theme: Theme;
  changeTheme: (theme: Theme) => void;
};
const themeContextDefaultValue: ThemeContextType = {
  theme: 'light',
  changeTheme: () => {},
};

export const ThemeContext = createContext<ThemeContextType>(themeContextDefaultValue);

export const ThemeProvider = ({ children }: Props) => {
  const [theme, setTheme] = useState<Theme>('light');
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    const localStorageTheme = (localStorage.getItem('theme') as Theme) || 'light';
    setTheme(localStorageTheme);
  }, []);

  if (!isMounted) return <Loading />;

  const changeTheme = (theme: Theme) => {
    localStorage.setItem('theme', theme);
    setTheme(theme);
  };

  return (
    <ThemeContext.Provider value={{ theme, changeTheme }}>
      <div data-theme={theme}>{children}</div>
    </ThemeContext.Provider>
  );
};
