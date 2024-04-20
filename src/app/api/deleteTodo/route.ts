import { deleteTodoList } from '@server/db/queries';
import { URL } from 'url';

export async function DELETE(request: Request) {
  const url = new URL(request.url);
  const id = url.searchParams.get('id');
  if (!id) {
    return new Response('Missing id parameter', {
      status: 400,
    });
  }
  await deleteTodoList(id);
  return new Response(null, {
    status: 204,
  });
}
