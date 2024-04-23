import { getTodoList } from '@server/db/queries';

export async function GET(request: Request) {
  const url = new URL(request.url);
  const id = url.searchParams.get('id');
  if (!id) {
    return new Response('Missing id parameter', {
      status: 400,
    });
  }
  const todoList = await getTodoList(id);
  return new Response(JSON.stringify(todoList), {
    status: 200,
    headers: { 'Content-Type': 'application/json' },
  });
}
