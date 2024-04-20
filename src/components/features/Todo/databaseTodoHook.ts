'use client'; // This is a client component 👈

import { ITodo } from '@features/Todo/Todo.interface';
import { useEffect, useState } from 'react';

export default function useDatabaseTodos() {
  const [refresh, setRefresh] = useState(0);
  const [todos, setTodos] = useState<ITodo[]>([]);

  const fetchTodos = async () => {
    const response = await fetch('/api/getTodos');
    const data = await response.json();
    setTodos(data);
  };

  const addTodoList = (todoList: ITodo) => {
    console.log('Adding new todo list...', todoList);
    fetch('/api/createTodo', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(todoList),
    }).then(() => setRefresh(oldKey => oldKey + 1));
  };

  useEffect(() => {
    console.log('Fetching todos...');
    fetchTodos();
  }, [refresh]);

  return { todos, addTodoList };
}
