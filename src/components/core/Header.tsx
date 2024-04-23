'use client'; // This is a client component 👈

import { ThemeContext, ThemeContextType } from '@context/ThemeContext/ThemeContext';
import { MoonIcon, SunIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import { useContext } from 'react';

export default function Header() {
  const { theme, changeTheme } = useContext<ThemeContextType>(ThemeContext);

  return (
    <>
      <div className="flex items-center justify-between mt-4">
        <h1 className="text-3xl">
          <Link role="button" href="/">
            📋 What Todo
          </Link>
        </h1>
        <button className="btn btn-ghost" onClick={() => changeTheme(theme === 'light' ? 'dark' : 'light')}>
          {theme === 'light' ? <MoonIcon className="h-6 w-6" /> : <SunIcon className="h-6 w-6" />}
        </button>
      </div>
    </>
  );
}
