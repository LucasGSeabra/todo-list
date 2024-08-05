import React, { useState } from "react";
import {
  Box,
  Button,
  Card,
  CardContent,
  IconButton,
  TextField,
  Typography,
} from "@mui/material";
import { Delete, Edit, Check, Close } from "@mui/icons-material";
import Todo from "../../types/Todo";

interface TodoProps {
  todo: Todo;
  onPressComplete: () => void;
  onPressDelete: () => void;
  onPressEdit: (value: string) => void;
  onPressReopen: () => void;
}

const AdviceCard = ({
  todo,
  onPressComplete,
  onPressDelete,
  onPressEdit,
  onPressReopen,
}: TodoProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editingValue, setEditingValue] = useState("");
  const [showError, setShowError] = useState(false);

  const handleEditing = (value: string) => {
    if (value.length > 0) {
      onPressEdit(value);
      setIsEditing(false);
      setEditingValue("");
      setShowError(false);
    } else {
      setShowError(true);
    }
  };

  return (
    <Box marginTop={3} marginBottom={3} sx={{ width: "100%" }}>
      <Card
        variant="outlined"
        sx={{
          flex: 1,
          borderColor: todo.completed ? "#1dc908" : "#b0b0b0 ",
          borderWidth: 2,
        }}
      >
        <CardContent>
          <Box
            display={"flex"}
            flexDirection={"row"}
            justifyContent={"space-between"}
            alignItems={"center"}
          >
            {isEditing ? (
              <>
                <TextField
                  placeholder={todo.task}
                  variant="standard"
                  size="small"
                  value={editingValue}
                  onChange={(e) => setEditingValue(e.target.value)}
                  sx={{ flex: 1 }}
                  error={showError}
                  helperText={
                    showError
                      ? "Insira uma tarefa válida e tente novamente"
                      : ""
                  }
                />
                <Box display={"flex"} flexDirection={"row"}>
                  <IconButton
                    size="small"
                    onClick={() => handleEditing(editingValue)}
                  >
                    <Check color="success" />
                  </IconButton>
                  <IconButton
                    size="small"
                    onClick={() => {
                      setIsEditing(false);
                      setEditingValue("");
                    }}
                  >
                    <Close color="error" />
                  </IconButton>
                </Box>
              </>
            ) : (
              <>
                <Typography variant="body1" align="justify">
                  {todo.task}
                </Typography>
                <Box display={"flex"} flexDirection={"row"}>
                  {todo.completed ? (
                    <IconButton size="small" onClick={onPressReopen}>
                      <Close color="warning" />
                    </IconButton>
                  ) : (
                    <IconButton size="small" onClick={onPressComplete}>
                      <Check color="success" />
                    </IconButton>
                  )}
                  {!todo.completed && (
                    <IconButton size="small" onClick={() => setIsEditing(true)}>
                      <Edit color="info" />
                    </IconButton>
                  )}
                  <IconButton size="small" onClick={onPressDelete}>
                    <Delete color="error" />
                  </IconButton>
                </Box>
              </>
            )}
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
};

export default AdviceCard;
