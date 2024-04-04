import { useState, useEffect, useCallback } from "react";
import { ITodo } from "./Todo.interface";

export default function useTodos() {
  const [todos, setTodos] = useState<ITodo[]>([]);
  const LOCAL_STORAGE_KEY = "todos";

  useEffect(() => {
    const localStorageTodos = localStorage.getItem("todos");
    if (localStorageTodos) {
      try {
        setTodos(JSON.parse(localStorageTodos));
      } catch (error) {
        console.error("Failed to parse todos:", error);
      }
    }
  }, []);

  const addTodo = useCallback(
    (todo: ITodo) => {
      const newTodos = [...todos, todo];
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(newTodos));
      setTodos(newTodos);
    },
    [todos]
  );

  const deleteTodo = useCallback(
    (_id: number) => {
      const newTodos = todos.filter((todo) => todo._id !== _id);
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(newTodos));
      setTodos(newTodos);
    },
    [todos]
  );

  const updateTodo = useCallback(
    (_id: number, checked: boolean) => {
      const _todos = [...todos];
      const foundTodo = _todos.find((todo) => todo._id === _id);
      if (!foundTodo) return;
      foundTodo.completed = checked;
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(_todos));
      setTodos(_todos);
    },
    [todos]
  );

  return { todos, addTodo, deleteTodo, updateTodo };
}
