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
      <div className="card card-compact sm:card-normal w-full sm:w-64 sm:h-72 bg-neutral text-neutral-content shadow-xl">
        <div className="card-body">
          <h2 className="card-title">{todoList.title}</h2>
          <p>{todoList.description}</p>
        </div>
        <div className="card-actions flex-row mt-6 gap-0">
          <button className="btn btn-md btn-error rounded-none rounded-bl-lg flex-1" onClick={handleDeleteTodoList}>
            <TrashIcon className="w-5 h-5 text-base-100" />
          </button>
          <Link
            href={`/todo-list/${todoList.id}`}
            className="btn btn-md btn-ghost rounded-none rounded-br-lg bg-base flex-1"
          >
            <EyeIcon className="w-5 h-5 text-neutral-content" />
          </Link>
        </div>
      </div>
    </>
  );
}
