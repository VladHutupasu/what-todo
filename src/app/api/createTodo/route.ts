import { createTodo } from '@server/db/queries';

export async function POST(request: Request) {
  const todo = await request.json();
  const newTodo = await createTodo(todo);
  return new Response(JSON.stringify(newTodo), {
    status: 201,
    headers: { 'Content-Type': 'application/json' },
  });
}
