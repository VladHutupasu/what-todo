import TodoListsOverview from '@features/TodoListsOverview/TodoListsOverview';
import { getTodoLists } from '@server/db';

export default async function Home() {
  const todoLists = await getTodoLists();

  return (
    <>
      <TodoListsOverview todoLists={todoLists} />
    </>
  );
}
