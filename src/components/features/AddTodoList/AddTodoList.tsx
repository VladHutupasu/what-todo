import { ITodo } from '@features/Todo/Todo.interface';
import PlusIcon from '@heroicons/react/24/outline/PlusIcon';
import { useState } from 'react';

export default function AddTodoList({ addTodoList }: { addTodoList: (todoList: ITodo) => void }) {
  const [name, setName] = useState<string>('');
  const [description, setDescription] = useState<string>('');

  const addNewTodoList = () => {
    console.log('New Todo List');
    addTodoList({
      _id: Date.now(),
      name: name,
      description: description,
      items: [],
    });
  };

  return (
    <>
      <button
        className="btn btn-secondary btn-circle ml-auto"
        onClick={() => (document?.getElementById('my_modal_2') as HTMLDialogElement)?.showModal()}
      >
        <PlusIcon className="w-6 h-6" />
      </button>

      <dialog id="my_modal_2" className="modal">
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
            <button className="btn btn-secondary" onClick={addNewTodoList}>
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
