'use client';

import AddTodoItem from '@features/AddTodoItem/AddTodoItem';
import { ITodo, ITodoItem } from '@features/TodoItem/Todo.interface';
import TodoItem from '@features/TodoItem/TodoItem';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function TodoOverview() {
  const { slug } = useParams<{ slug: string }>();
  const todoListId = slug;
  const [todoList, setTodoList] = useState<ITodo | null>(null);

  const handleTodoItemAdded = async (todoItem: ITodoItem) => {
    // Generate a temporary id
    const tempId = Date.now().toString();

    // Optimistically add the new item to the UI with the temporary id
    setTodoList(prev => (prev ? { ...prev, items: [...prev.items, { ...todoItem, id: tempId }] } : null));

    // Send the add request to the server
    try {
      const response = await fetch(`/api/todoItem`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(todoItem),
      });

      if (!response.ok) {
        throw new Error(`${response.status} | ${response.statusText}`);
      }

      // Replace the temporary id with the real id from the server
      const newItem = await response.json();
      setTodoList(prev =>
        prev ? { ...prev, items: prev.items.map(item => (item.id === tempId ? newItem : item)) } : null
      );
    } catch (error) {
      // If the request fails, remove the new item from the UI
      setTodoList(prev => (prev ? { ...prev, items: prev.items.filter(item => item.id !== tempId) } : null));
      console.error('Failed to add todo item: ', error);
    }
  };

  const handleTodoItemDeleted = (todoItemId: string) => {
    // Find the index of the item before removing it
    const itemIndex = todoList?.items.findIndex(item => item.id === todoItemId);

    // Optimistically remove the item from the UI
    setTodoList(prev => (prev ? { ...prev, items: prev.items.filter(item => item.id !== todoItemId) } : null));

    // Send the delete request to the server
    // If the request fails, add the item back to the UI
    fetch(`/api/todoItem?id=${todoItemId}`, {
      method: 'DELETE',
    })
      .then(response => {
        if (!response.ok) {
          throw new Error(`${response.status} | ${response.statusText}`);
        }
      })
      .catch(error => {
        setTodoList(prev => {
          if (prev && itemIndex !== undefined) {
            // Insert the item back into its original position
            const newItems = [...prev.items];
            newItems.splice(itemIndex, 0, todoList!.items.find(item => item.id === todoItemId)!);
            return { ...prev, items: newItems };
          }
          return null;
        });
        console.log('Cannot delete todo item: ', error);
      });
  };

  const handleTodoItemCompleted = (todoItem: ITodoItem, completed: boolean) => {
    // Optimistically update the item in the UI
    setTodoList(prev =>
      prev
        ? {
            ...prev,
            items: prev.items.map(item => (item.id === todoItem.id ? { ...item, completed } : item)),
          }
        : null
    );

    // Send the update request to the server
    // If the request fails, reset the item in the UI
    fetch(`/api/todoItem`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ ...todoItem, completed }),
    })
      .then(response => {
        if (!response.ok) {
          throw new Error(`${response.status} | ${response.statusText}`);
        }
      })
      .catch(error => {
        setTodoList(prev =>
          prev ? { ...prev, items: prev.items.map(item => (item.id === todoItem.id ? todoItem : item)) } : null
        );
        console.log('Cannot mark todo item as completed: ', error);
      });
  };

  useEffect(() => {
    const fetchTodoList = async () => {
      const response = await fetch(`/api/getTodo?id=${todoListId}`);
      const data = await response.json();
      setTodoList(data);
    };

    fetchTodoList();
  }, [todoListId]);

  if (!todoList) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <h1 className="text-xl font-semibold my-20">{todoList.title}</h1>

      <AddTodoItem todoListId={todoListId} onTodoItemAdded={handleTodoItemAdded} />

      <section className="mt-10">
        {todoList.items.map(item => (
          <TodoItem
            key={item.id}
            todoItem={item}
            onTodoItemDeleted={handleTodoItemDeleted}
            onTodoItemCompleted={handleTodoItemCompleted}
          />
        ))}
      </section>
    </>
  );
}
