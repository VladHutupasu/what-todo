import { ITodo } from '@features/Todo/Todo.interface';
import { db } from '.';

export async function getTodos(): Promise<ITodo[]> {
  const todos = await db.todoList.findMany();
  return todos as unknown as ITodo[];
}

export async function getTodoList(todoListId: string) {
  return await db.todoList.findUnique({
    where: {
      id: todoListId,
    },
    include: {
      items: true,
    },
  });
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

export async function deleteTodoList(todoListId: string) {
  return await db.$transaction([
    db.todoItem.deleteMany({
      where: {
        todoListId: todoListId,
      },
    }),
    db.todoList.delete({
      where: {
        id: todoListId,
      },
    }),
  ]);
}
