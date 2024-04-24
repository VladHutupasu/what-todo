import AddTodoList from '@features/AddTodoList/AddTodoList';
import TodoList from '@features/TodoList/TodoList';
import { getTodoLists } from '@server/db/queries';
import { ITodoList } from '@shared/models/Todo.interface';

export default async function TodoListsOverview() {
  const todos = await getTodoLists();

  return (
    <>
      <div className="flex flex-wrap gap-5 justify-center content-center mt-24">
        {todos.map((todo: ITodoList) => (
          <TodoList key={todo.id} todo={todo} />
        ))}
      </div>

      <AddTodoList />
    </>
  );
}
