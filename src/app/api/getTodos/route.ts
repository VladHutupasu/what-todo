import { getTodos } from '@server/db/queries';

export async function GET() {
  const todos = await getTodos();
  return new Response(JSON.stringify(todos), {
    status: 200,
    headers: { 'Content-Type': 'application/json' },
  });
}
