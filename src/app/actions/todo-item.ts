'use server';

import { createTodoItem, deleteTodoItem, updateTodoItem } from '@server/db';
import { ITodoItem } from '@shared/models/Todo.interface';
import { revalidatePath } from 'next/cache';

export async function createTodoItemAction(todoItem: ITodoItem) {
  try {
    await createTodoItem({
      text: todoItem.text,
      completed: false,
      todoListId: todoItem.todoListId,
    });
  } catch (error) {
    console.error('Failed to create todo item', error);
  }
  revalidatePath(`/todo-list/${todoItem.todoListId}`);
}

export async function updateTodoItemAction(todoItem: ITodoItem) {
  try {
    await updateTodoItem(todoItem);
  } catch (error) {
    console.error('Failed to update todo item', error);
  }
  revalidatePath(`/todo-list/${todoItem.todoListId}`);
}

export async function deleteTodoItemAction(todoItem: ITodoItem) {
  try {
    await deleteTodoItem(todoItem.id!);
  } catch (error) {
    console.error('Failed to delete todo item', error);
  }
  revalidatePath(`/todo-list/${todoItem.todoListId}`);
}
