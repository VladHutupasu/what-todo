'use client';

import { ContextWrapper } from '@context/ContextWrapper';
import { HomeIcon, PlusIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import { useContext } from 'react';

export default function MobileNavbar() {
  const { displayMode, setPlusClicked } = useContext(ContextWrapper);

  return (
    <>
      {displayMode === 'pwa' && (
        <div className="md:hidden btm-nav btm-nav-lg text-primary bg-transparent backdrop-blur-lg z-50">
          <button className="active:scale-90">
            <Link href="/">
              <HomeIcon className="w-6 h-6" />
            </Link>
          </button>

          <button id="plus-button" className="active:scale-90" onClick={() => setPlusClicked(Date.now())}>
            <PlusIcon className="w-6 h-6" />
          </button>
        </div>
      )}
    </>
  );
}
