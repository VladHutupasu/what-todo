import { ContextWrapper } from '@context/ContextWrapper';
import PlusIcon from '@heroicons/react/24/outline/PlusIcon';
import { ITodoItem } from '@shared/models/Todo.interface';
import { useContext, useState } from 'react';

export default function DesktopAddTodoItem({
  todoListId,
  onTodoItemAdded,
}: {
  todoListId: string;
  onTodoItemAdded: (todoItem: ITodoItem) => void;
}) {
  const [inputValue, setInputValue] = useState<string>('');
  const { displayMode } = useContext(ContextWrapper);

  const handleAddTodo = () => {
    if (!inputValue) return;
    setInputValue('');
    onTodoItemAdded({ id: Date.now().toString(), text: inputValue, completed: false, todoListId });
  };

  return (
    <>
      <label
        className={`${
          displayMode === 'pwa' ? 'hidden md:flex' : ''
        } input input-bordered flex input-primary max-w-xs items-center gap-2 pr-0 mb-8`}
      >
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
        <button className="btn btn-ghost" onClick={handleAddTodo}>
          <PlusIcon className="h-4 w-4" />
        </button>
      </label>
    </>
  );
}
