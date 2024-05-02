'use client'; // This is a client component 👈

import { ContextWrapper, ContextWrapperType } from '@context/ThemeContext/ThemeContext';
import { ClipboardIcon } from '@heroicons/react/24/outline';
import MoonIcon from '@heroicons/react/24/outline/MoonIcon';
import SunIcon from '@heroicons/react/24/outline/SunIcon';
import Link from 'next/link';
import { useContext } from 'react';

export default function Header() {
  const { theme, changeTheme } = useContext<ContextWrapperType>(ContextWrapper);

  return (
    <>
      <div className="navbar bg-base-100 fixed w-full z-50">
        <div className="navbar-start ">
          <Link role="button" className="flex items-center gap-4" href="/">
            <ClipboardIcon className="h-6 w-6 text-primary" />
            <span className="font-semibold text-2xl ">What Todo</span>
          </Link>
        </div>
        <div className="navbar-end">
          <button
            className="btn btn-ghost text-primary"
            onClick={() => changeTheme(theme === 'nord' ? 'dracula' : 'nord')}
          >
            {theme === 'nord' ? <MoonIcon className="h-6 w-6" /> : <SunIcon className="h-6 w-6" />}
          </button>
        </div>
      </div>
    </>
  );
}
