'use client';

import { EyeIcon, TrashIcon } from '@heroicons/react/24/outline';
import { ITodoList } from '@shared/models/Todo.interface';
import Link from 'next/link';

export default function TodoList({
  todoList,
  handleDeleteTodoList,
}: {
  todoList: ITodoList;
  handleDeleteTodoList: () => void;
}) {
  return (
    <>
      <div className="card w-40 md:w-64 bg-neutral text-neutral-content shadow-xl">
        <div className="card-body">
          <h2 className="card-title">{todoList.title}</h2>
          <p>{todoList.description}</p>
          <div className="card-actions justify-between flex-nowrap mt-6">
            <button className="btn btn-outline btn-sm btn-error" onClick={handleDeleteTodoList}>
              <TrashIcon className="w-4 h-4" />
              <span className="hidden md:block">Delete</span>
            </button>
            <Link
              role="button"
              href={`/todo-list/${todoList.id}`}
              className="btn btn-outline btn-sm text-neutral-content"
            >
              <EyeIcon className="w-4 h-4" />
              <span className="hidden md:block">Open</span>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
