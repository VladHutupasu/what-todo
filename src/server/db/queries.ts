import { ITodo } from '@features/Todo/Todo.interface';
import { db } from '.';

export async function getTodos(): Promise<ITodo[]> {
  const todos = await db.todoList.findMany({
    include: {
      items: true,
    },
  });
  return todos as unknown as ITodo[];
}

export async function createTodo(todo: ITodo) {
  return await db.todoList.create({
    data: {
      title: todo.title,
      description: todo.description,
      items: {
        create: {
          text: 'Item 1 (default)',
          completed: false,
        },
      },
    },
  });
}
