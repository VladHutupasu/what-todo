import AddTodoList from '@features/AddTodoList/AddTodoList';
import { ITodo } from '@features/Todo/Todo.interface';
import useTodos from '@features/Todo/todoHook';
import Card from '@shared/Card/Card';

export default function TodosOverview() {
  const { addTodoList, todos } = useTodos();

  return (
    <>
      <div className="flex flex-wrap gap-5 justify-center content-center mt-24">
        {todos.map((todo: ITodo) => (
          <Card key={todo._id} todo={todo} />
        ))}
      </div>

      <AddTodoList addTodoList={addTodoList} />
    </>
  );
}
