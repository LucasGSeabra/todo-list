import React from "react";
import { Box, Button, TextField } from "@mui/material";
import { Add } from "@mui/icons-material";

interface AddTodoProps {
  value: string;
  onChangeValue: (value: string) => void;
  addTodo: () => void;
  hasError?: boolean;
}

const AddTodo = ({ value, onChangeValue, addTodo, hasError }: AddTodoProps) => {
  return (
    <Box
      display={"flex"}
      flexDirection={"row"}
      sx={{ width: "100%", marginTop: 2 }}
    >
      <TextField
        label="Nova tarefa"
        placeholder="Tirar as roupas do varal"
        variant="outlined"
        size="small"
        value={value}
        onChange={(e) => onChangeValue(e.target.value)}
        sx={{ flex: 1 }}
        error={hasError}
        helperText={
          hasError ? "Insira uma tarefa válida e tente novamente" : ""
        }
      />
      <Button
        color="success"
        size="small"
        variant="contained"
        onClick={addTodo}
        sx={{ marginLeft: 1, maxHeight: 40 }}
        startIcon={<Add />}
      >
        Adicionar
      </Button>
    </Box>
  );
};

export default AddTodo;
