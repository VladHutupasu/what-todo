import { deleteTodoList } from '@server/db/queries';
import { URL } from 'url';

export async function DELETE(request: Request) {
  const todoListId = new URL(request.url).searchParams.get('id');
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
