import TodosOverview from '@features/TodosOverview/TodosOverview';
import { createPost, getPosts } from '../server/db/queries';

export default async function Home() {
  const createdPost = await createPost();
  console.log('[dev] Created Post - ', createdPost);
  const allPosts = await getPosts();
  console.log('[dev] All Posts - ', allPosts);

  return (
    <>
      <TodosOverview />
    </>
  );
}
