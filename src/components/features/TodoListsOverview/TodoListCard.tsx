'use client';

import { TrashIcon } from '@heroicons/react/24/outline';
import { ITodoList } from '@shared/models/Todo.interface';
import Link from 'next/link';

export default function TodoListCard({
  todoList,
  handleDeleteTodoList,
}: {
  todoList: ITodoList;
  handleDeleteTodoList: () => void;
}) {
  return (
    <>
      <div className="card card-side rounded-lg sm:image-full sm:card-normal w-full sm:w-72 bg-neutral text-neutral-content shadow-xl">
        <Link href={`/todo-list/${todoList.id}`} className="card-body sm:hover:opacity-70">
          <h1 className="card-title text-xl font-semibold">{todoList.title}</h1>
          <p className="label-text text-neutral-content">{todoList.description}</p>
        </Link>
        <div className="card-actions flex-col items-stretch">
          <button
            className="btn btn-md btn-error rounded-none rounded-r-lg sm:rounded-none sm:rounded-b-lg flex-1"
            onClick={handleDeleteTodoList}
          >
            <TrashIcon className="w-5 h-5 text-base-100" />
          </button>
        </div>
      </div>
    </>
  );
}
