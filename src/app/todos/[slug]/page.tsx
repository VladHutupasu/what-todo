'use client';

import { ITodo } from '@features/Todo/Todo.interface';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function TodoOverview() {
  const { slug } = useParams<{ slug: string }>();
  const todoListId = slug;
  const [todoList, setTodoList] = useState<ITodo | null>(null);

  useEffect(() => {
    fetch(`/api/getTodo?id=${todoListId}`)
      .then(response => response.json())
      .then(todoList => setTodoList(todoList));
  }, [todoListId]);

  if (!todoList) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <h1>{todoList.title}</h1>
      {todoList.items.map(item => (
        <div key={item.id}>
          <input type="checkbox" checked={item.completed} />
          <span>{item.text}</span>
        </div>
      ))}

      {/* <h1>{getTodoList(todoListId)?.name}</h1>

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
