'use client';

import { createTodoListAction } from '@actions/createTodoList';
import { deleteTodoListAction } from '@actions/deleteTodoList';
import TodoList from '@features/TodoList/TodoList';
import { ITodoList } from '@shared/models/Todo.interface';
import { useOptimistic, useRef, useTransition } from 'react';
import AddTodoListFloatingButton from './AddTodoListFloatingButton';

export default function TodoListsOverview({ todoLists }: { todoLists: ITodoList[] }) {
  const formRef = useRef<HTMLFormElement>(null);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [isPending, startTransition] = useTransition();
  const [optimisticTodoLists, addOptimisticTodoList] = useOptimistic(
    todoLists,
    (state, { type, newTodoList }: { type: 'update' | 'delete' | 'add'; newTodoList: ITodoList }) => {
      switch (type) {
        case 'delete':
          return state.filter(({ id }) => id !== newTodoList.id);
        case 'update':
          return state.map(t => (t.id === newTodoList.id ? newTodoList : t));
        default:
          return [...state, newTodoList];
      }
    }
  );

  return (
    <>
      <div className="flex flex-col flex-wrap gap-3 sm:flex-row sm:gap-5 justify-center content-center my-16 sm:my-24">
        {optimisticTodoLists.map((todoList: ITodoList) => (
          <TodoList
            key={todoList.id}
            todoList={todoList}
            handleDeleteTodoList={() =>
              startTransition(() => {
                addOptimisticTodoList({ type: 'delete', newTodoList: todoList });
                deleteTodoListAction(todoList.id as string);
              })
            }
          />
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
                type: 'add',
                newTodoList: {
                  id: Date.now().toString(),
                  title: formData.get('title') as string,
                  description: formData.get('description') as string,
                  items: [],
                },
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
