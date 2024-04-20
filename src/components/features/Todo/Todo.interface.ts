export interface ITodo {
  id?: string;
  title: string;
  description: string;
  items: ITodoItem[];
}

export interface ITodoItem {
  id?: string;
  text: string;
  completed: boolean;
  todoListId?: string;
}
