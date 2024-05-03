'use client';

import { createTodoItemAction, deleteTodoItemAction, updateTodoItemAction } from '@actions/todo-item';
import DesktopAddTodoItem from '@features/TodoListDetail/DesktopAddTodoItem';
import { ITodoItem, ITodoList } from '@shared/models/Todo.interface';
import { useOptimistic, useTransition } from 'react';
import MobileAddTodoItem from './MobileAddTodoItem';
import TodoItem from './TodoItem';

export default function TodoListDetail({ todoList }: { todoList: ITodoList }) {
  const [isPending, startTransition] = useTransition();

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
      <section className="mt-32">
        <h1 className="text-xl font-semibold leading-10">{todoList.title}</h1>
        <p className="label-text">{todoList.description}</p>
      </section>
      <div className="divider divider-primary my-11 sm:my-16"></div>
      <DesktopAddTodoItem
        todoListId={todoList.id!}
        onTodoItemAdded={(todoItem: ITodoItem) =>
          startTransition(() => {
            setOptimisticTodoItems({ type: 'add', newTodoItem: todoItem });
            createTodoItemAction(todoItem);
          })
        }
      />

      <section>
        {optimisticTodoItems.map(item => (
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
        ))}
        <MobileAddTodoItem
          todoListId={todoList.id!}
          onTodoItemAdded={(todoItem: ITodoItem) =>
            startTransition(() => {
              setOptimisticTodoItems({ type: 'add', newTodoItem: todoItem });
              createTodoItemAction(todoItem);
            })
          }
        />
      </section>
    </>
  );
}
