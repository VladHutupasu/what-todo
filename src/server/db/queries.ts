import { db } from '.';

export async function getPosts() {
  const posts = await db.todoList.findMany();
  return posts;
}

export async function createPost() {
  const post = await db.todoList.create({
    data: {
      title: 'Todo from Prisma',
      description: 'This is a test todo',
    },
  });
  return post;
}
