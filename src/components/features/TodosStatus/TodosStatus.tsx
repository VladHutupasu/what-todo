import { ITodoItem } from '@features/Todo/Todo.interface';
import Image from 'next/image';

export default function TodosStatus({ todos }: { todos: ITodoItem[] }) {
  const showCompletionStatus = () => {
    const completedDivider = <div className="divider divider-secondary">Completed</div>;
    const allDoneMessage = <div className="text-lg text-center my-4">All done for today! 🎉</div>;

    if (todos.length === 0) {
      // Load a gif from public folder
      return (
        <div className="mx-auto my-auto">
          <Image src="/no-todos.gif" alt="loading" width={480} height={480} />
        </div>
      );
    }
    const completedTodos = todos.filter(todo => todo.completed);

    if (completedTodos.length === 0) {
      return;
    } else if (completedTodos.length === todos.length) {
      return allDoneMessage;
    } else if (completedTodos.length > 0) {
      return completedDivider;
    }
  };

  return <>{showCompletionStatus()}</>;
}
