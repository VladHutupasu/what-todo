'use client';

import { HomeIcon, PlusIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';

export default function AddTodoListFloatingButton({ dialogRef }: { dialogRef?: React.RefObject<HTMLDialogElement> }) {
  const openModal = () => {
    dialogRef?.current?.showModal();
  };

  return (
    <>
      <div className="hidden md:block">
        <button
          className="btn btn-primary btn-circle fixed top-[88%] left-[83%] md:top-[93%] md:left-[93%] shadow-2xl"
          onClick={openModal}
        >
          <PlusIcon className="w-6 h-6" />
        </button>
      </div>

      <div className="md:hidden btm-nav text-primary bg-transparent backdrop-blur-lg">
        <button>
          <Link href="/">
            <HomeIcon className="w-5 h-5" />
          </Link>
        </button>
        <button onClick={openModal}>
          <PlusIcon className="w-5 h-5" />
        </button>
      </div>
    </>
  );
}
