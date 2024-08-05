import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../store";
import getTodosIds from "../../../utils/getTodosIds";
import Todo from "../../../types/Todo";

interface TodosState {
  todos: Todo[];
}

const initialState: TodosState = {
  todos: [],
};

const todoSlice = createSlice({
  name: "todosSlice",
  initialState: initialState,
  reducers: {
    createTodo: (state, action: PayloadAction<string>) => {
      const now = Date.now();
      const newTodo: Todo = {
        id: `${now}${action.payload}`,
        task: action.payload,
        completed: false,
      };

      state.todos.push(newTodo);
    },
    updateTodo: (state, action: PayloadAction<Todo>) => {
      state.todos = state.todos.map((todo) =>
        todo.id === action.payload.id ? action.payload : todo
      );
    },
    deleteTodo: (state, action: PayloadAction<Todo>) => {
      state.todos = state.todos.filter((todo) => todo.id !== action.payload.id);
    },
    markAllAsComplete: (state, action: PayloadAction<Todo[]>) => {
      const todosToComplete = getTodosIds(action.payload);

      state.todos = state.todos.map((todo) =>
        todosToComplete.includes(todo.id) ? { ...todo, completed: true } : todo
      );
    },
    deleteAllCompleted: (state, action: PayloadAction<Todo[]>) => {
      const todosToDelete = getTodosIds(action.payload);

      state.todos = state.todos.filter((todo) => !todosToDelete.includes(todo.id));
    },
  },
});

export const {
  createTodo,
  deleteTodo,
  updateTodo,
  deleteAllCompleted,
  markAllAsComplete,
} = todoSlice.actions;

export const getAllTodos = (state: RootState) => state.todos;

export default todoSlice.reducer;
