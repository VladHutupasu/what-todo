import { ITodo } from '@features/Todo/Todo.interface';
import Link from 'next/link';

export default function Card({ todo }: { todo: ITodo }) {
  return (
    <>
      <div className="card w-64 bg-primary text-primary-content">
        <div className="card-body">
          <h2 className="card-title">{todo.name}</h2>
          <p>{todo.description}</p>
          <div className="card-actions justify-end">
            <Link role="button" href={`/todos/${todo._id}`} className="btn">
              Open
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
