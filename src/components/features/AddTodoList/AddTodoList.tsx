'use client';

import { createTodoListAction } from '@actions/createTodoList';
import TodoList from '@features/TodoList/TodoList';
import { ITodoList } from '@shared/models/Todo.interface';
import { useOptimistic, useRef } from 'react';
import AddTodoListFloatingButton from './AddTodoListFloatingButton';

export default function TodoListsOverview({ todoLists }: { todoLists: ITodoList[] }) {
  const formRef = useRef<HTMLFormElement>(null);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [optimisticTodoLists, addOptimisticTodoList] = useOptimistic(todoLists, (state, newTodoList: ITodoList) => {
    return [...state, newTodoList];
  });

  return (
    <>
      <div className="flex flex-wrap gap-5 justify-center content-center mt-24">
        {optimisticTodoLists.map((todoList: ITodoList) => (
          <TodoList key={todoList.id} todoList={todoList} />
        ))}
      </div>

      <AddTodoListFloatingButton dialogRef={dialogRef} />

      <dialog id="add-todo-list-modal" ref={dialogRef} className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg mb-8">Add a new Todo List</h3>
          <form
            action={formData => {
              formRef.current?.reset();
              addOptimisticTodoList({
                id: Math.random().toString(36).substr(2, 9),
                title: formData.get('title') as string,
                description: formData.get('description') as string,
                items: [],
              });
              createTodoListAction(formData);
            }}
            ref={formRef}
            className="flex flex-col gap-2"
          >
            <input type="text" name="title" placeholder="Name" className="input input-bordered" />
            <input type="text" name="description" placeholder="Description" className="input input-bordered" />
            <button type="submit" className="btn btn-primary" onClick={() => dialogRef.current?.close()}>
              Add
            </button>
          </form>
        </div>
        <form method="dialog" className="modal-backdrop">
          <button>close</button>
        </form>
      </dialog>
    </>
  );
}
