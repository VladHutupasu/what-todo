import TodosOverview from '@features/TodosOverview/TodosOverview';

export const dynamic = 'force-dynamic';

export default async function Home() {
  return (
    <>
      <TodosOverview />
    </>
  );
}
