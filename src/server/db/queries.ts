'use server-only';

import { ITodo, ITodoItem } from '@features/Todo/Todo.interface';
import { db } from './config';

export async function getTodos(): Promise<ITodo[]> {
  console.log('Fetching todos...');
  const todos = await db.todoList.findMany();
  return todos as unknown as ITodo[];
}

export async function getTodoList(todoListId: string) {
  return await db.todoList.findUnique({
    where: {
      id: todoListId,
    },
    include: {
      items: true,
    },
  });
}

export async function createTodo(todo: ITodo) {
  return await db.todoList.create({
    data: {
      title: todo.title,
      description: todo.description,
      items: {
        create: {
          text: 'Item 1 (default)',
          completed: false,
        },
      },
    },
  });
}

export async function deleteTodoItem(todoItemId: string) {
  return await db.todoItem.delete({
    where: {
      id: todoItemId,
    },
  });
}

export async function createTodoItem(todoItem: ITodoItem) {
  return await db.todoItem.create({
    data: {
      text: todoItem.text,
      completed: todoItem.completed,
      todoListId: todoItem.todoListId,
    },
  });
}

export async function updateTodoItem(todoItem: ITodoItem) {
  return await db.todoItem.update({
    where: {
      id: todoItem.id,
    },
    data: {
      text: todoItem.text,
      completed: todoItem.completed,
    },
  });
}

export async function deleteTodoList(todoListId: string) {
  return await db.$transaction([
    db.todoItem.deleteMany({
      where: {
        todoListId: todoListId,
      },
    }),
    db.todoList.delete({
      where: {
        id: todoListId,
      },
    }),
  ]);
}
