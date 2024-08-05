import React, { useEffect } from "react";
import { Box, Button, SxProps, TextField, Theme } from "@mui/material";

interface FiltersProps {
  isShown: boolean;
  filterText?: string;
  setFilterText: (filter: string) => void;
  filterByCompleted: () => void;
  filterByNotCompleted: () => void;
  removeFilters: () => void;
  markAllAsComplete: () => void;
  deleteAll: () => void;
}

interface FilterButtons {
  label: string;
  onClick: () => void;
  color:
    | "info"
    | "inherit"
    | "success"
    | "error"
    | "primary"
    | "secondary"
    | "warning";
  variant: "text" | "contained" | "outlined";
  sx?: SxProps<Theme>;
}

const Filters = ({
  isShown,
  filterText,
  setFilterText,
  deleteAll,
  filterByCompleted,
  filterByNotCompleted,
  markAllAsComplete,
  removeFilters,
}: FiltersProps) => {
  const firstRowButtons: FilterButtons[] = [
    {
      label: "Mostrar concluídos",
      onClick: filterByCompleted,
      color: "info",
      variant: "contained",
    },
    {
      label: "Mostrar pendentes",
      onClick: filterByNotCompleted,
      color: "info",
      variant: "contained",
      sx: { marginLeft: 1 },
    },
    {
      label: "Remover filtros",
      onClick: () => {
        removeFilters();
        setFilterText("");
      },
      color: "info",
      variant: "text",
      sx: { marginLeft: 1 },
    },
  ];

  const secondRowButtons: FilterButtons[] = [
    {
      label: "Concluir todos",
      onClick: markAllAsComplete,
      color: "success",
      variant: "contained",
    },
    {
      label: "Deletar concluidos",
      onClick: deleteAll,
      color: "error",
      variant: "contained",
      sx: { marginLeft: 1 },
    },
  ];

  useEffect(() => {
    if (!isShown) {
      removeFilters();
      setFilterText("");
    }
  }, [isShown]);

  return (
    <>
      {isShown && (
        <Box
          display={"flex"}
          justifyContent={"center"}
          alignItems={"center"}
          flexDirection={"column"}
          sx={{ marginTop: 2 }}
        >
          <Box display={"flex"} flexDirection={"row"} sx={{ width: "100%" }}>
            <TextField
              label="Buscar"
              placeholder="Passar as roupas de domingo"
              variant="outlined"
              size="small"
              value={filterText}
              onChange={(e) => setFilterText(e.target.value)}
              sx={{ flex: 1 }}
            />
          </Box>
          <Box
            display={"flex"}
            flexDirection={"row"}
            justifyContent={"flex-start"}
            sx={{ width: "100%", paddingTop: 1 }}
          >
            {firstRowButtons.map((button, index) => (
              <Button
                key={index}
                color={button.color}
                size="small"
                variant={button.variant}
                onClick={button.onClick}
                sx={button.sx}
              >
                {button.label}
              </Button>
            ))}
          </Box>
          <Box
            display={"flex"}
            flexDirection={"row"}
            sx={{ width: "100%", paddingTop: 1 }}
          >
            {secondRowButtons.map((button, index) => (
              <Button
                key={index}
                color={button.color}
                size="small"
                variant={button.variant}
                onClick={button.onClick}
                sx={button.sx}
              >
                {button.label}
              </Button>
            ))}
          </Box>
        </Box>
      )}
    </>
  );
};

export default Filters;
