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
  },
});

export default todoSlice.reducer;
