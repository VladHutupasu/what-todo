'use server';

import { deleteTodoList } from '@server/db';
import { revalidatePath } from 'next/cache';

//TODO: Add toaster on error
export async function deleteTodoListAction(todoListId: string) {
  try {
    await new Promise(resolve => setTimeout(resolve, 3_000));
    await deleteTodoList(todoListId);
  } catch (error) {
    console.error('Failed to delete todo list', error);
  }
  revalidatePath('/');
}
