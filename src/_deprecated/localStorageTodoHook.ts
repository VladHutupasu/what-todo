import { useCallback, useEffect, useState } from 'react';
interface ITodo {
  _id: number;
  name: string;
  description: string;
  items: ITodoItem[];
}

interface ITodoItem {
  _id: number;
  text: string;
  completed: boolean;
}

//TODO: Expose less methods
export default function useLocalStorageTodos() {
  const [todos, setTodos] = useState<ITodo[]>([]);

  const LOCAL_STORAGE_KEY = 'todos';

  useEffect(() => {
    const localStorageTodos = localStorage.getItem('todos');
    if (localStorageTodos) {
      try {
        setTodos(JSON.parse(localStorageTodos));
      } catch (error) {
        console.error('Failed to parse todos:', error);
      }
    }
  }, []);

  const getTodoList = useCallback(
    (todoListId: number) => {
      return todos.find(todo => todo._id === todoListId);
    },
    [todos]
  );

  const addTodoList = useCallback(
    (todoList: ITodo) => {
      const updatedTodos = [...todos, todoList];
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updatedTodos));
      setTodos(updatedTodos);
    },
    [todos]
  );

  const getTodoItems = useCallback(
    (todoListId: number) => {
      const todoList = getTodoList(todoListId);
      if (!todoList) {
        console.error(`Todo list with id ${todoListId} not found`);
        return [];
      }
      return todoList.items;
    },
    [getTodoList]
  );

  const addTodoItem = useCallback(
    (todoItem: ITodoItem, todoListId: number) => {
      const updatedTodos = todos.map(todo => {
        if (todo._id === todoListId) {
          return { ...todo, items: [...todo.items, todoItem] };
        }
        return todo;
      });
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updatedTodos));
      setTodos(updatedTodos);
    },
    [todos]
  );

  const deleteTodoItem = useCallback(
    (todoItemId: number, todoListId: number) => {
      const updatedTodos = todos.map(todo => {
        if (todo._id === todoListId) {
          return { ...todo, items: todo.items.filter(item => item._id !== todoItemId) };
        }
        return todo;
      });
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updatedTodos));
      setTodos(updatedTodos);
    },
    [todos]
  );

  const updateTodoItem = useCallback(
    (todoItemId: number, todoListId: number, checked: boolean) => {
      const updatedTodos = todos.map(todo => {
        if (todo._id === todoListId) {
          return {
            ...todo,
            items: todo.items.map(item => (item._id === todoItemId ? { ...item, completed: checked } : item)),
          };
        }
        return todo;
      });
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updatedTodos));
      setTodos(updatedTodos);
    },
    [todos]
  );

  return { todos, getTodoList, addTodoList, getTodoItems, addTodoItem, deleteTodoItem, updateTodoItem };
}
