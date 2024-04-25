import TodoListsOverview from '@features/AddTodoList/AddTodoList';
import { getTodoLists } from '@server/db';

export const dynamic = 'force-dynamic';
// export const revalidate = 0; Same thing?

export default async function Home() {
  const todoLists = await getTodoLists();

  return (
    <>
      <TodoListsOverview todoLists={todoLists} />
    </>
  );
}
