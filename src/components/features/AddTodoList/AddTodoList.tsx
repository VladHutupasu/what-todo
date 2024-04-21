'use client'; // This is a client component 👈

import PlusIcon from '@heroicons/react/24/outline/PlusIcon';
import { useRouter } from 'next/navigation';
import { useRef, useState } from 'react';

export default function AddTodoList() {
  const [name, setName] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const dialogRef = useRef<HTMLDialogElement>(null);
  const router = useRouter();

  const addNewTodoList = async () => {
    const response = await fetch('/api/createTodo', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ title: name, description, items: [] }),
    });

    if (!response.ok) {
      console.error('Failed to create todo', response);
      return;
    }

    dialogRef.current?.close();
    router.refresh();
  };

  return (
    <>
      <div>
        <button
          className="btn btn-primary btn-circle fixed top-[93%] left-[85%] md:left-[93%] shadow-2xl"
          onClick={() => (document?.getElementById('add-todo-list-modal') as HTMLDialogElement)?.showModal()}
        >
          <PlusIcon className="w-6 h-6" />
        </button>
      </div>

      <dialog id="add-todo-list-modal" className="modal" ref={dialogRef}>
        <div className="modal-box">
          <h3 className="font-bold text-lg">Add a new Todo List</h3>
          <div className="flex flex-col gap-2 py-8">
            <input
              type="text"
              placeholder="Name"
              value={name}
              onChange={e => setName(e.target.value)}
              className="input input-bordered"
            />
            <input
              type="text"
              placeholder="Description"
              value={description}
              onChange={e => setDescription(e.target.value)}
              className="input input-bordered"
            />
          </div>

          <div className="modal-action mt-0">
            <button className="btn btn-primary" onClick={addNewTodoList}>
              Add
            </button>
          </div>
        </div>
        <form method="dialog" className="modal-backdrop">
          <button>close</button>
        </form>
      </dialog>
    </>
  );
}
