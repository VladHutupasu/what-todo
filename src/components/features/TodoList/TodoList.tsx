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
      <div className="card w-full sm:w-64 bg-neutral text-neutral-content shadow-xl">
        <div className="card-body">
          <h2 className="card-title">{todoList.title}</h2>
          <p>{todoList.description}</p>
          <div className="card-actions flex-col sm:flex-row sm:justify-between sm:flex-nowrap mt-6">
            <button className="btn btn-outline btn-sm btn-error w-full sm:w-auto" onClick={handleDeleteTodoList}>
              <TrashIcon className="w-4 h-4" />
              <span>Delete</span>
            </button>
            <Link
              role="button"
              href={`/todo-list/${todoList.id}`}
              className="btn btn-outline btn-sm text-neutral-content w-full sm:w-auto"
            >
              <EyeIcon className="w-4 h-4" />
              <span>Open</span>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
