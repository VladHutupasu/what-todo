import { TrashIcon } from '@heroicons/react/24/outline';
import { ITodoItem } from '@shared/models/Todo.interface';

export default function TodoItem({
  todoItem,
  onTodoItemDeleted,
  onTodoItemCompleted,
}: {
  todoItem: ITodoItem;
  onTodoItemDeleted: (todoItemId: string) => void;
  onTodoItemCompleted: (todoItem: ITodoItem, completed: boolean) => void;
}) {
  return (
    <div className="flex cursor-pointer label justify-start hover:bg-primary hover:bg-opacity-5 rounded">
      <input
        type="checkbox"
        checked={todoItem.completed}
        onChange={e => onTodoItemCompleted(todoItem, e.target.checked)}
        className="checkbox checkbox-primary"
      />
      <span
        className={`label-text ml-3 ${todoItem.completed ? 'line-through' : ''}`}
        style={{ overflowWrap: 'break-word', wordWrap: 'break-word', maxWidth: '75%' }}
      >
        {todoItem.text}
      </span>
      <button className="btn btn-ghost ml-auto" onClick={() => onTodoItemDeleted(todoItem.id!)}>
        <TrashIcon className="h-4 w-4 text-error " />
      </button>
    </div>
  );
}
