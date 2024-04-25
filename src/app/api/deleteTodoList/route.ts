import { deleteTodoList } from '@server/db/queries';
import { NextRequest } from 'next/server';

export async function DELETE(request: NextRequest) {
  const todoListId = request.nextUrl.searchParams.get('id');
  if (!todoListId) {
    return new Response('Missing id parameter', {
      status: 400,
    });
  }
  await deleteTodoList(todoListId);
  return new Response(null, {
    status: 204,
  });
}
