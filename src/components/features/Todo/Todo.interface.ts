export interface ITodo {
  _id: number;
  name: string;
  description: string;
  items: ITodoItem[];
}

export interface ITodoItem {
  _id: number;
  text: string;
  completed: boolean;
}
