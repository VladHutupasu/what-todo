import TodoListDetail from '@features/TodoListDetail/TodoListDetail';
import { FaceFrownIcon } from '@heroicons/react/24/outline';
import { getTodoList } from '@server/db';

export default async function TodoList({ params }: { params: { slug: string } }) {
  const todoListId = params.slug;
  const todoList = await getTodoList(todoListId);

  if (!todoList) {
    return (
      <div className="flex items-center justify-center h-screen">
        <h1 className="font-semibold">
          Todo list not found <FaceFrownIcon className="h-5 h-5 inline-block" />
        </h1>
      </div>
    );
  }

  return <TodoListDetail todoList={todoList} />;
}
