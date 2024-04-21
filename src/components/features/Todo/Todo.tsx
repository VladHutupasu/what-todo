import { TrashIcon } from '@heroicons/react/24/outline';
import { ITodoItem } from './Todo.interface';

export default function Todo({
  todo,
  onTodoDeleted,
  onTodoChecked,
}: {
  todo: ITodoItem;
  onTodoDeleted: () => void;
  onTodoChecked: () => void;
}) {
  const handleDeleteTodo = async () => {
    console.log('Delete todo');
    await fetch(`/api/todoItem?id=${todo.id}`, {
      method: 'DELETE',
    });
    onTodoDeleted();
  };

  const handleCheckboxTodo = async (checked: boolean) => {
    console.log('Checkbox todo', checked);
    todo.completed = checked;
    await fetch(`/api/todoItem`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(todo),
    });
    onTodoChecked();
  };

  return (
    <div className="flex flex-col">
      <label className="cursor-pointer label justify-start hover:bg-secondary hover:bg-opacity-5 rounded">
        <input
          type="checkbox"
          checked={todo.completed}
          onChange={e => handleCheckboxTodo(e.target.checked)}
          className="checkbox checkbox-secondary"
        />
        <span className={`label-text ml-3 ${todo.completed ? 'line-through' : ''}`}>{todo.text}</span>
        <button className="btn btn-ghost p-2 ml-auto" onClick={handleDeleteTodo}>
          <TrashIcon className="h-6 w-6 text-secondary " />
        </button>
      </label>
    </div>
  );
}
