'use server';

import { createTodoList, deleteTodoList } from '@server/db';
import { revalidatePath } from 'next/cache';

//TODO: Add toaster on error
export async function createTodoListAction(formData: FormData) {
  try {
    await createTodoList({
      title: formData.get('title') as string,
      description: formData.get('description') as string,
      items: [],
    });
  } catch (error) {
    console.error('Failed to create todo list', error);
  }
  revalidatePath('/');
}

export async function deleteTodoListAction(todoListId: string) {
  try {
    await deleteTodoList(todoListId);
  } catch (error) {
    console.error('Failed to delete todo list', error);
  }
  revalidatePath('/');
}
