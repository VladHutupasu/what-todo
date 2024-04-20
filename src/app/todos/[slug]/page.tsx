'use client'; // This is a client component 👈

import AddTodo from '@features/AddTodo/AddTodo';
import Todo from '@features/Todo/Todo';
import useDatabaseTodos from '@features/Todo/databaseTodoHook';
import TodosStatus from '@features/TodosStatus/TodosStatus';
import { useParams } from 'next/navigation';

export default function TodoOverview() {
  const { todos, addTodoList } = useDatabaseTodos();
  const { slug } = useParams<{ slug: string }>();
  const todoListId = +slug;

  return (
    <>
      <h1>{getTodoList(todoListId)?.name}</h1>

      <div className="mt-20">
        <AddTodo addTodoItem={addTodoItem} todoListId={todoListId} />

        {getTodoItems(todoListId)
          .filter(todo => !todo.completed)
          .map(todo => (
            <Todo
              key={todo._id}
              todo={todo}
              handleDeleteTodo={() => deleteTodoItem(todo._id, todoListId)}
              handleCheckboxTodo={checked => updateTodoItem(todo._id, todoListId, checked)}
            />
          ))}
        <TodosStatus todos={getTodoItems(todoListId)} />
        {getTodoItems(todoListId)
          .filter(todo => todo.completed)
          .map(todo => (
            <Todo
              key={todo._id}
              todo={todo}
              handleDeleteTodo={() => deleteTodoItem(todo._id, todoListId)}
              handleCheckboxTodo={checked => updateTodoItem(todo._id, todoListId, checked)}
            />
          ))}
      </div>
    </>
  );
}
