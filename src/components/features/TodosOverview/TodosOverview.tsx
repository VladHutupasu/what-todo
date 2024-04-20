'use client'; // This is a client component 👈

import AddTodoList from '@features/AddTodoList/AddTodoList';
import { ITodo } from '@features/Todo/Todo.interface';
import useDatabaseTodos from '@features/Todo/databaseTodoHook';
import useLocalStorageTodos from '@features/Todo/localStorageTodoHook';
import Card from '@shared/Card/Card';

export default function TodosOverview() {
  const { addTodoList, todos } = useLocalStorageTodos();

  const { todosDBHook, addTodoListDB } = useDatabaseTodos();

  const addTodoListToLocalStorage = (todoList: ITodo) => {
    addTodoList(todoList);
    addTodoListDB(todoList);
  };

  return (
    <>
      <div className="flex flex-wrap gap-5 justify-center content-center mt-24">
        {todos.map((todo: ITodo) => (
          <Card key={todo._id} todo={todo} />
        ))}
      </div>

      <div className="flex flex-wrap gap-5 justify-center content-center mt-24">
        {todosDBHook.map((todo: any) => (
          <Card key={todo.id} todo={todo} />
        ))}
      </div>

      <AddTodoList addTodoList={addTodoListToLocalStorage} />
    </>
  );
}
