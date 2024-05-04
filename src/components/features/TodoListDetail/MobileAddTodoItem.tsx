import { ContextWrapper } from '@context/ContextWrapper';
import { CheckIcon, XMarkIcon } from '@heroicons/react/24/outline';
import { ITodoItem } from '@shared/models/Todo.interface';
import { useContext, useEffect, useRef, useState } from 'react';

export default function MobileAddTodoItem({
  todoListId,
  onTodoItemAdded,
}: {
  todoListId: string;
  onTodoItemAdded: (todoItem: ITodoItem) => void;
}) {
  const [isEditing, setIsEditing] = useState(false);
  const { displayMode } = useContext(ContextWrapper);
  const inputRef = useRef<HTMLInputElement>(null);
  const [shouldFocus, setShouldFocus] = useState(false);

  const addTodoItem = () => {
    onTodoItemAdded({ text: inputRef.current?.value as string, completed: false, todoListId });
    setIsEditing(false);
  };

  useEffect(() => {
    //TODO: get ref from context instead of querying the DOM
    const plusButton = document.getElementById('plus-button');
    if (!plusButton) return;

    const handleClick = () => {
      setIsEditing(true);
      setShouldFocus(true);
    };
    plusButton.addEventListener('click', handleClick);

    // Clean up the event listener when the component unmounts
    return () => {
      plusButton.removeEventListener('click', handleClick);
    };
  }, []);

  useEffect(() => {
    if (shouldFocus && inputRef.current) {
      inputRef.current.focus();
      setShouldFocus(false);
    }
  }, [shouldFocus]);

  useEffect(() => {
    if (!isEditing) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Enter') {
        addTodoItem();
      }
    };

    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isEditing]);

  if (displayMode !== 'pwa') return null;

  return (
    <>
      {isEditing && (
        <div className="flex cursor-pointer label justify-start hover:bg-primary hover:bg-opacity-5 rounded">
          <input type="checkbox" className="checkbox checkbox-primary" />
          <input
            ref={inputRef}
            type="text"
            placeholder="Type here"
            className="input input-ghost w-full mx-3 focus:outline-none border-none"
          />
          <button className="btn btn-ghost ml-auto" onClick={() => addTodoItem()}>
            <CheckIcon className="h-4 w-4 text-success " />
          </button>
          <button className="btn btn-ghost ml-auto" onClick={() => setIsEditing(false)}>
            <XMarkIcon className="h-4 w-4 text-error " />
          </button>
        </div>
      )}
    </>
  );
}
