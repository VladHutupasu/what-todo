import TodosOverview from '@features/TodosOverview/TodosOverview';

export const dynamic = 'force-dynamic';
// export const revalidate = 0; Same thing?

export default async function Home() {
  return (
    <>
      <TodosOverview />
    </>
  );
}
