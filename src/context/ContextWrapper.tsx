'use client'; // This is a client component 👈

import { ReactNode, createContext, useEffect, useState } from 'react';
import Loading from '../app/loading';

type Props = {
  children: ReactNode;
};

export type DisplayMode = 'browser' | 'pwa';
export type Theme = 'nord' | 'dracula';
export type ContextWrapperType = {
  theme: Theme;
  changeTheme: (theme: Theme) => void;
  plusClicked: number;
  setPlusClicked: (plusClicked: number) => void;
  displayMode: DisplayMode;
};
const contextWrapperDefaultValue: ContextWrapperType = {
  theme: 'dracula',
  changeTheme: () => {},
  plusClicked: 0,
  setPlusClicked: () => {},
  displayMode: 'browser',
};

export const ContextWrapper = createContext<ContextWrapperType>(contextWrapperDefaultValue);

export const ContextWrapperProvider = ({ children }: Props) => {
  const [theme, setTheme] = useState<Theme>('dracula');
  const [plusClicked, setPlusClicked] = useState<number>(0);
  const [isMounted, setIsMounted] = useState(false);
  const [displayMode, setDisplayMode] = useState<DisplayMode>('browser');

  useEffect(() => {
    setIsMounted(true);
    const localStorageTheme = (localStorage.getItem('theme') as Theme) || 'dracula';
    setTheme(localStorageTheme);

    let displayMode: DisplayMode = 'browser';
    if (window.matchMedia('(display-mode: standalone)').matches) {
      displayMode = 'pwa';
    }
    setDisplayMode(displayMode);
    // Log launch display mode to analytics
    console.log('DISPLAY_MODE_LAUNCH:', displayMode);
  }, []);

  if (!isMounted) return <Loading />;

  const changeTheme = (theme: Theme) => {
    localStorage.setItem('theme', theme);
    setTheme(theme);
  };

  return (
    <ContextWrapper.Provider value={{ theme, displayMode, changeTheme, plusClicked, setPlusClicked }}>
      <div data-theme={theme}>{children}</div>
    </ContextWrapper.Provider>
  );
};
