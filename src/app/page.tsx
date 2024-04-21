import TodosOverview from '@features/TodosOverview/TodosOverview';

export const revalidate = 0;

export default async function Home() {
  return (
    <>
      <TodosOverview />
    </>
  );
}
