'use client';

import { createTodoListAction, deleteTodoListAction } from '@actions/todo-list';
import { ContextWrapper } from '@context/ContextWrapper';
import TodoListCard from '@features/TodoListsOverview/TodoListCard';
import { ITodoList } from '@shared/models/Todo.interface';
import { useContext, useEffect, useOptimistic, useRef, useTransition } from 'react';
import AddTodoListFloatingButton from './AddTodoListFloatingButton';

export default function TodoListsOverview({ todoLists }: { todoLists: ITodoList[] }) {
  const formRef = useRef<HTMLFormElement>(null);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [isPending, startTransition] = useTransition();
  const { plusClicked } = useContext(ContextWrapper);
  const isFirstRender = useRef(true);
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

  useEffect(() => {
    // Prevent modal to show up on component mount
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }

    dialogRef.current?.showModal();
  }, [plusClicked]);

  return (
    <>
      <div className="flex flex-col flex-wrap gap-4 sm:flex-row sm:gap-5 justify-center content-center my-24 sm:my-36">
        {optimisticTodoLists.map((todoList: ITodoList) => (
          <TodoListCard
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

      {/* TODO: See if this can be used. Did not work on click, was shifting layout - max-sm:focus-within:items-start max-sm:focus-within:mt-[20%] */}
      {/* Lazy load this with condition && ModalComponent to defer bundle load */}
      <dialog id="add-todo-list-modal" ref={dialogRef} className="modal items-start">
        <div className="modal-box mt-40">
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
