import Todo from "../../types/Todo";

const getTodosIds = (todos: Todo[]) => {
  return todos.map((todo) => todo.id);
};

export default getTodosIds;
