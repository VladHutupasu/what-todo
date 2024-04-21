import PlusIcon from '@heroicons/react/24/outline/PlusIcon';
import { useState } from 'react';

export default function AddTodo({ todoListId, onTodoAdded }: { todoListId: string; onTodoAdded: () => void }) {
  const [inputValue, setInputValue] = useState<string>('');

  const handleAddTodo = async () => {
    if (!inputValue) return;

    const response = await fetch(`/api/todoItem`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ text: inputValue, completed: false, todoListId }),
    });

    setInputValue('');
    onTodoAdded();
  };

  return (
    <>
      <label className="input input-bordered flex input-secondary w-full max-w-xs items-center gap-2 pr-0">
        <input
          type="text"
          className="grow"
          placeholder="Add a new Todo"
          value={inputValue}
          onChange={event => setInputValue(event.target.value)}
          onKeyDown={event => {
            if (event.key === 'Enter') {
              handleAddTodo();
            }
          }}
        />
        <button className="btn btn-ghost">
          <PlusIcon className="h-6 w-6" onClick={handleAddTodo} />
        </button>
      </label>
    </>
  );
}
