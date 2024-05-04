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
  const { displayMode, plusClicked } = useContext(ContextWrapper);
  const isFirstRender = useRef(true);
  const inputRef = useRef<HTMLInputElement>(null);

  const addTodoItem = () => {
    onTodoItemAdded({ text: inputRef.current?.value as string, completed: false, todoListId });
    setIsEditing(false);
  };

  useEffect(() => {
    const plusButton = document.getElementById('plus-button');
    if (!plusButton) return;

    const handleClick = () => {
      console.log('plus button clicked', isEditing);
      setTimeout(() => inputRef.current?.focus(), 100);
    };

    plusButton.addEventListener('click', handleClick);

    // Clean up the event listener when the component unmounts
    return () => {
      plusButton.removeEventListener('click', handleClick);
      console.log('plus button removed');
    };
  }, []);

  useEffect(() => {
    // Prevent modal to show up on component mount
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    setIsEditing(true);
  }, [plusClicked]);

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
