import React, { useMemo } from "react";
import { useState } from "react";
import { useSelector } from "react-redux";
import {
  createTodo,
  deleteAllCompleted,
  deleteTodo,
  getAllTodos,
  markAllAsComplete,
  updateTodo,
} from "../../redux/slices/todoSlice";
import { useAppDispatch } from "../../redux/hooks";
import { Box, Button, Container, TextField } from "@mui/material";
import Todo from "../../component/Todo";
import { FilterAlt } from "@mui/icons-material";
import Filters from "../../component/Filters";
import AddTodo from "../../component/AddTodo";

const MainPage = () => {
  const [newTodo, setNewTodo] = useState("");
  const [filterText, setFilterText] = useState("");
  const [showFilters, setShowFilters] = useState(false);
  const [showError, setShowError] = useState(false);
  const [filterCompleted, setFilterCompleted] = useState<
    "ALL" | "COMPLETED" | "NOT_COMPLETED"
  >("ALL");
  const dispatch = useAppDispatch();

  const todos = useSelector(getAllTodos);

  const filteredTodos = useMemo(() => {
    let filtered = todos;

    if (filterText !== "") {
      filtered = filtered.filter((todo) =>
        todo.task.toLowerCase().includes(filterText.toLowerCase())
      );
    }

    if (filterCompleted === "COMPLETED") {
      filtered = filtered.filter((todo) => todo.completed);
    }

    if (filterCompleted === "NOT_COMPLETED") {
      filtered = filtered.filter((todo) => !todo.completed);
    }

    return filtered;
  }, [filterText, todos, filterCompleted]);

  const addTodo = () => {
    if (newTodo.length > 0) {
      dispatch(createTodo(newTodo));
      setNewTodo("");
      setShowError(false);
    } else {
      setShowError(true);
    }
  };

  return (
    <Container maxWidth={"sm"} sx={{ marginBottom: 3 }}>
      <AddTodo value={newTodo} onChangeValue={setNewTodo} addTodo={addTodo} hasError={showError}/>
      <Box
        display={"flex"}
        flexDirection={"row"}
        sx={{ width: "100%", marginTop: 2 }}
      >
        <Button
          color={showFilters ? "warning" : "info"}
          size="small"
          variant="outlined"
          onClick={() => setShowFilters(!showFilters)}
          startIcon={<FilterAlt />}
        >
          {showFilters ? "Ocultar filtros" : "Exibir filtros"}
        </Button>
      </Box>
      <Filters
        isShown={showFilters}
        filterText={filterText}
        setFilterText={setFilterText}
        filterByCompleted={() => setFilterCompleted("COMPLETED")}
        filterByNotCompleted={() => setFilterCompleted("NOT_COMPLETED")}
        removeFilters={() => {
          setFilterCompleted("ALL");
          setFilterText("");
        }}
        markAllAsComplete={() => dispatch(markAllAsComplete(filteredTodos))}
        deleteAll={() => dispatch(deleteAllCompleted(filteredTodos))}
      />
      <Box
        display={"flex"}
        justifyContent={"center"}
        alignItems={"center"}
        flexDirection={"column"}
      >
        {filteredTodos.map((todo, index) => (
          <Todo
            key={index}
            todo={todo}
            onPressComplete={() =>
              dispatch(updateTodo({ ...todo, completed: true }))
            }
            onPressReopen={() =>
              dispatch(updateTodo({ ...todo, completed: false }))
            }
            onPressEdit={(task) => dispatch(updateTodo({ ...todo, task }))}
            onPressDelete={() => dispatch(deleteTodo(todo))}
          />
        ))}
      </Box>
    </Container>
  );
};

export default MainPage;
