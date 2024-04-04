"use client"; // This is a client component 👈

import Todo from "@features/Todo/Todo";
import useTodos from "@features/Todo/todoHook";
import Image from "next/image";
import { useState } from "react";

export default function Home() {
  const { todos, addTodo, deleteTodo, updateTodo } = useTodos();
  const [inputValue, setInputValue] = useState<string>("");

  const handleAddTodo = () => {
    addTodo({ _id: Date.now(), text: inputValue, completed: false });
    setInputValue("");
  };

  const showCompletionStatus = () => {
    const completedDivider = (
      <div className="divider divider-secondary">Completed</div>
    );
    const allDoneMessage = (
      <div className="text-lg text-center my-4">All done for today! 🎉</div>
    );

    if (todos.length === 0) {
      // Load a gif from public folder
      return (
        <div className="mx-auto my-auto">
          <Image
            src="/no-todos.gif"
            alt="loading"
            width={480}
            height={480}
          />
        </div>
      );
    }
    const completedTodos = todos.filter((todo) => todo.completed);

    if (completedTodos.length === 0) {
      return;
    } else if (completedTodos.length === todos.length) {
      return allDoneMessage;
    } else if (completedTodos.length > 0) {
      return completedDivider;
    }
  };

  return (
    <>
      <div className="mt-20">
        <input
          type="text"
          placeholder="Add a new Todo"
          className="input input-bordered input-secondary w-full max-w-xs mb-4"
          value={inputValue}
          onChange={(event) => setInputValue(event.target.value)}
          onKeyDown={(event) => {
            if (event.key === "Enter") {
              handleAddTodo();
            }
          }}
        />
        {todos
          .filter((todo) => !todo.completed)
          .map((todo) => (
            <Todo
              key={todo._id}
              todo={todo}
              handleDeleteTodo={() => deleteTodo(todo._id)}
              handleCheckboxTodo={(checked) => updateTodo(todo._id, checked)}
            />
          ))}
      </div>
      {showCompletionStatus()}
      {todos
        .filter((todo) => todo.completed)
        .map((todo) => (
          <Todo
            key={todo._id}
            todo={todo}
            handleDeleteTodo={() => deleteTodo(todo._id)}
            handleCheckboxTodo={(checked) => updateTodo(todo._id, checked)}
          />
        ))}
    </>
  );
}
