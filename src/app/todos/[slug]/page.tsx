'use client';

import AddTodo from '@features/AddTodo/AddTodo';
import Todo from '@features/Todo/Todo';
import { ITodo } from '@features/Todo/Todo.interface';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function TodoOverview() {
  const { slug } = useParams<{ slug: string }>();
  const todoListId = slug;
  const [todoList, setTodoList] = useState<ITodo | null>(null);

  const fetchTodoList = async () => {
    const response = await fetch(`/api/getTodo?id=${todoListId}`);
    const data = await response.json();
    setTodoList(data);
  };

  useEffect(() => {
    fetchTodoList();
  }, []);

  if (!todoList) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <h1 className="text-xl font-semibold my-20">{todoList.title}</h1>

      <AddTodo todoListId={todoListId} onTodoAdded={fetchTodoList} />

      <section className="mt-10">
        {todoList.items.map(item => (
          <Todo key={item.id} todo={item} onTodoDeleted={fetchTodoList} onTodoChecked={fetchTodoList} />
        ))}
      </section>

      {/*

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
      </div> */}
    </>
  );
}
