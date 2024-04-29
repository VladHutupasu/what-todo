'use client';

import { ThemeContext } from '@context/ThemeContext/ThemeContext';
import { HomeIcon, PlusIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import { useContext } from 'react';

export default function MobileNavbar() {
  const { setPlusClicked } = useContext(ThemeContext);

  return (
    <div className="md:hidden btm-nav text-primary bg-transparent backdrop-blur-lg">
      <button>
        <Link
          href="/"
          onClick={() => {
            if (!window.navigator || !window.navigator.vibrate) {
              console.log('Cannot vibrate');
              return;
            }
            window.navigator?.vibrate(200);
          }}
        >
          <HomeIcon className="w-5 h-5" />
        </Link>
      </button>

      <button onClick={() => setPlusClicked(Date.now())}>
        <PlusIcon className="w-5 h-5" />
      </button>
    </div>
  );
}
