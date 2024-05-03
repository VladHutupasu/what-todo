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
          <button>
            <Link href="/">
              <HomeIcon className="w-5 h-5" />
            </Link>
          </button>

          <button onClick={() => setPlusClicked(Date.now())}>
            <PlusIcon className="w-5 h-5" />
          </button>
        </div>
      )}
    </>
  );
}
