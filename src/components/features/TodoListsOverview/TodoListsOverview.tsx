import AddTodoList from '@features/AddTodoList/AddTodoList';
import { ITodo } from '@features/TodoItem/Todo.interface';
import TodoList from '@features/TodoList/TodoList';
import { getTodos } from '@server/db/queries';

export default async function TodoListsOverview() {
  const todos = await getTodos();

  return (
    <>
      <div className="flex flex-wrap gap-5 justify-center content-center mt-24">
        {todos.map((todo: ITodo) => (
          <TodoList key={todo.id} todo={todo} />
        ))}
      </div>

      <AddTodoList />
    </>
  );
}
