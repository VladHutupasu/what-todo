import PlusIcon from '@heroicons/react/24/outline/PlusIcon';
import { useState } from 'react';
import { ITodoItem } from '../Todo/Todo.interface';

export default function AddTodo({
  addTodoItem,
  todoListId,
}: {
  addTodoItem: (todoItem: ITodoItem, todoListId: number) => void;
  todoListId: number;
}) {
  const [inputValue, setInputValue] = useState<string>('');

  const handleAddTodo = () => {
    if (!inputValue) return;
    addTodoItem({ _id: Date.now(), text: inputValue, completed: false }, todoListId);
    setInputValue('');
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
