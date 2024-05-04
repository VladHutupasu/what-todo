'use client';

import { createTodoItemAction, deleteTodoItemAction, updateTodoItemAction } from '@actions/todo-item';
import { ContextWrapper } from '@context/ContextWrapper';
import DesktopAddTodoItem from '@features/TodoListDetail/DesktopAddTodoItem';
import { PlusIcon } from '@heroicons/react/24/outline';
import { ITodoItem, ITodoList } from '@shared/models/Todo.interface';
import { useContext, useOptimistic, useState, useTransition } from 'react';
import MobileAddTodoItem from './MobileAddTodoItem';
import TodoItem from './TodoItem';

export default function TodoListDetail({ todoList }: { todoList: ITodoList }) {
  const { displayMode } = useContext(ContextWrapper);
  const [isPending, startTransition] = useTransition();
  const [isAddingTodoItem, setIsAddingTodoItem] = useState(false);

  const [optimisticTodoItems, setOptimisticTodoItems] = useOptimistic(
    todoList.items,
    (state, { type, newTodoItem }: { type: 'update' | 'delete' | 'add'; newTodoItem: ITodoItem }) => {
      switch (type) {
        case 'delete':
          return state.filter(({ id }) => id !== newTodoItem.id);
        case 'update':
          return state.map(t => (t.id === newTodoItem.id ? newTodoItem : t));
        default:
          return [...state, newTodoItem];
      }
    }
  );

  return (
    <>
      <section className={`${displayMode === 'pwa' ? 'mt-11' : 'mt-24'}` + ' mb-11 sm:mb-16'}>
        <h1 className="text-xl font-semibold leading-10">{todoList.title}</h1>
        <p className="label-text">{todoList.description}</p>
      </section>

      <DesktopAddTodoItem
        todoListId={todoList.id!}
        onTodoItemAdded={(todoItem: ITodoItem) =>
          startTransition(() => {
            setOptimisticTodoItems({ type: 'add', newTodoItem: todoItem });
            createTodoItemAction(todoItem);
          })
        }
      />

      <section className="mb-28">
        {optimisticTodoItems.length > 0 || isAddingTodoItem ? (
          optimisticTodoItems.map(item => (
            <TodoItem
              key={item.id}
              todoItem={item}
              onTodoItemDeleted={(todoItem: ITodoItem) =>
                startTransition(() => {
                  setOptimisticTodoItems({ type: 'delete', newTodoItem: todoItem });
                  deleteTodoItemAction(todoItem);
                })
              }
              onTodoItemUpdated={(todoItem: ITodoItem) =>
                startTransition(() => {
                  setOptimisticTodoItems({ type: 'update', newTodoItem: todoItem });
                  updateTodoItemAction(todoItem);
                })
              }
            />
          ))
        ) : (
          <h2 className="font-semibold text-center mt-36">
            Use <PlusIcon className="h-6 h-6 inline-block text-primary" /> to add a new todo
          </h2>
        )}
        <MobileAddTodoItem
          todoListId={todoList.id!}
          onTodoItemAdded={(todoItem: ITodoItem) =>
            startTransition(() => {
              setOptimisticTodoItems({ type: 'add', newTodoItem: todoItem });
              createTodoItemAction(todoItem);
            })
          }
          isAddingTodoItem={isAddingTodoItem => {
            console.log('isAdding - ', isAddingTodoItem);
            setIsAddingTodoItem(isAddingTodoItem);
          }}
        />
      </section>
    </>
  );
}
