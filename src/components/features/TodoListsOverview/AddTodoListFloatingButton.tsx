'use client';

import { PlusIcon } from '@heroicons/react/24/outline';

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
    </>
  );
}
