import { getTodoList } from '@server/db/queries';
import { NextRequest } from 'next/server';

export async function GET(request: NextRequest) {
  const id = request.nextUrl.searchParams.get('id');
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
