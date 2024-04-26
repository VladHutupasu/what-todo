'use client'; // This is a client component 👈

import { ReactNode, createContext, useEffect, useState } from 'react';
import Loading from '../../app/loading';

type Props = {
  children: ReactNode;
};
export type Theme = 'nord' | 'dracula';
export type ThemeContextType = {
  theme: Theme;
  changeTheme: (theme: Theme) => void;
};
const themeContextDefaultValue: ThemeContextType = {
  theme: 'dracula',
  changeTheme: () => {},
};

export const ThemeContext = createContext<ThemeContextType>(themeContextDefaultValue);

export const ThemeProvider = ({ children }: Props) => {
  const [theme, setTheme] = useState<Theme>('dracula');
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    const localStorageTheme = (localStorage.getItem('theme') as Theme) || 'dracula';
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
