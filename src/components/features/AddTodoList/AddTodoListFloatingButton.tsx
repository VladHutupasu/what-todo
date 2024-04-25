'use client';

import PlusIcon from '@heroicons/react/24/outline/PlusIcon';

export default function AddTodoListFloatingButton({ dialogRef }: { dialogRef: React.RefObject<HTMLDialogElement> }) {
  return (
    <>
      <div>
        <button
          className="btn btn-primary btn-circle fixed top-[88%] left-[83%] md:top-[93%] md:left-[93%] shadow-2xl"
          onClick={() => dialogRef.current?.showModal()}
        >
          <PlusIcon className="w-6 h-6" />
        </button>
      </div>
    </>
  );
}
