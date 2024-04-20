'use client';

import { ITodo } from '@features/Todo/Todo.interface';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function Card({ todo }: { todo: ITodo }) {
  const router = useRouter();

  const handleDeleteTodoList = async () => {
    if (!todo.id) return;
    await fetch(`/api/deleteTodo?id=${todo.id}`, {
      method: 'DELETE',
    });
    router.refresh();
  };

  return (
    <>
      <div className="card w-64 bg-primary text-primary-content">
        <div className="card-body">
          <h2 className="card-title">{todo.title}</h2>
          <p>{todo.description}</p>
          <div className="card-actions justify-end">
            <button className="btn btn-warning" onClick={handleDeleteTodoList}>
              Delete
            </button>
            <Link role="button" href={`/todos/${todo.id}`} className="btn">
              Open
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
