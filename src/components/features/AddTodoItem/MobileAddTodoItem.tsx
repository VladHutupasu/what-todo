import { ThemeContext } from '@context/ThemeContext/ThemeContext';
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
  const { plusClicked } = useContext(ThemeContext);
  const isFirstRender = useRef(true);
  const inputRef = useRef<HTMLInputElement>(null);

  const addTodoItem = () => {
    onTodoItemAdded({ text: inputRef.current?.value as string, completed: false, todoListId });
    setIsEditing(false);
  };

  useEffect(() => {
    // Prevent modal to show up on component mount
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    setIsEditing(true);
  }, [plusClicked]);

  function forceFocus() {
    // create invisible dummy input to receive the focus first
    const fakeInput = document.createElement('input');
    fakeInput.setAttribute('type', 'text');
    fakeInput.style.position = 'absolute';
    fakeInput.style.opacity = '0';
    fakeInput.style.height = '0';
    fakeInput.style.fontSize = '16px'; // disable auto zoom

    // you may need to append to another element depending on the browser's auto
    // zoom/scroll behavior
    document.body.prepend(fakeInput);

    // focus so that subsequent async focus will work
    fakeInput.focus();

    setTimeout(() => {
      // now we can focus on the target input
      inputRef.current?.focus();

      // cleanup
      fakeInput.remove();
    }, 1000);
  }

  useEffect(() => {
    if (!isEditing) return;
    forceFocus();
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
