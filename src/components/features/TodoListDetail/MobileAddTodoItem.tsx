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

  setTimeout(() => {
    // if (inputRef.current) {
    //   inputRef.current.value = 'Your value here';
    //   inputRef.current.focus();
    // }

    var openButton = document.getElementById('open-search');
    var closeButton = document.getElementById('close-search');
    var searchBox = document.getElementById('search-box');
    var searchInput = document.getElementById('search-input');
    openButton!.onclick = function () {
      searchBox!.style.display = 'block';
      searchInput!.focus();
    };
    closeButton!.onclick = function () {
      searchBox!.style.display = 'none';
    };
  }, 3000);

  useEffect(() => {
    // Prevent modal to show up on component mount
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    setIsEditing(true);
  }, [plusClicked]);

  useEffect(() => {
    if (!isEditing) {
      inputRef.current?.blur();
      return;
    }

    inputRef.current?.focus();

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
      <div>
        <a href="/" id="ms-outer" className="for-outer">
          <img src="//ae01.alicdn.com/kf/HTB1O8URHFXXXXXPaXXX760XFXXXQ.png" alt="AE Logo" />
        </a>
        <div className="header-main">
          <div id="open-search">open</div>
        </div>
      </div>

      <div id="search-box">
        <form action="/search.htm">
          <div className="ms-autocomplete-main">
            <input id="search-input" type="search" placeholder="search" name="keywords" />
          </div>
          <div id="close-search">close</div>
        </form>
      </div>

      {/* {isEditing && ( */}
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
      {/* )} */}
    </>
  );
}
