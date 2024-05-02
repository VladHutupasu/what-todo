'use server';
import { createTodoItem, deleteTodoItem, updateTodoItem } from '@server/db';
import { ITodoItem } from '@shared/models/Todo.interface';
import { NextRequest } from 'next/server';

export async function POST(request: Request) {
  const todoItem = (await request.json()) as ITodoItem;
  const newTodoItem = await createTodoItem(todoItem);
  return new Response(JSON.stringify(newTodoItem), {
    status: 200,
    headers: {
      'Content-Type': 'application/json',
    },
  });
}

export async function DELETE(request: NextRequest) {
  const todoItemId = request.nextUrl.searchParams.get('id');
  if (!todoItemId) {
    return new Response('Missing id parameter', {
      status: 400,
    });
  }
  await deleteTodoItem(todoItemId);
  return new Response(null, {
    status: 200,
  });
}

export async function PUT(request: Request) {
  const todoItem = (await request.json()) as ITodoItem;
  await updateTodoItem(todoItem);
  return new Response(null, {
    status: 200,
  });
}
