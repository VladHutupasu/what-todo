import 'server-only';

import { ITodoItem, ITodoList } from '@shared/models/Todo.interface';
import db from './config';

export async function getTodoLists(): Promise<ITodoList[]> {
  console.log('Fetching todo lists...');
  const todos = await db.todoList.findMany();
  return todos as unknown as ITodoList[];
}

export async function getTodoList(todoListId: string) {
  console.log('Fetching todo items...');

  const isValidObjectId = /^[0-9a-fA-F]{24}$/.test(todoListId);

  if (!isValidObjectId) {
    return null;
  }
  return await db.todoList.findUnique({
    where: {
      id: todoListId,
    },
    include: {
      items: true,
    },
  });
}

export async function createTodoList(todo: ITodoList) {
  return await db.todoList.create({
    data: {
      title: todo.title,
      description: todo.description,
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
