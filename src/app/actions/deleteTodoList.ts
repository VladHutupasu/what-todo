'use server';

import { deleteTodoList } from '@server/db';
import { revalidatePath } from 'next/cache';

//TODO: Add toaster on error
export async function deleteTodoListAction(todoListId: string) {
  try {
    await deleteTodoList(todoListId);
  } catch (error) {
    console.error('Failed to delete todo list', error);
  }
  revalidatePath('/');
}
