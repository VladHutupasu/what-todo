import AddTodoList from '@features/AddTodoList/AddTodoList';
import { ITodo } from '@features/Todo/Todo.interface';
import { getTodos } from '@server/db/queries';
import Card from '@shared/Card/Card';

export const dynamic = 'force-dynamic';

export default async function TodosOverview() {
  const todos = await getTodos();

  return (
    <>
      <div className="flex flex-wrap gap-5 justify-center content-center mt-24">
        {todos.map((todo: ITodo) => (
          <Card key={todo.id} todo={todo} />
        ))}
      </div>

      <AddTodoList />
    </>
  );
}
