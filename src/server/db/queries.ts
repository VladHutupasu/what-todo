import { ITodo } from '@features/Todo/Todo.interface';
import { db } from '.';

export async function getTodos() {
  const todos = await db.todoList.findMany({
    include: {
      items: true,
    },
  });
  return todos;
}

export async function createTodo(todo: ITodo) {
  return await db.todoList.create({
    data: {
      title: todo.name,
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
