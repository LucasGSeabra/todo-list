import React from "react";
import MainPage from "./pages/MainPage";
import { CssBaseline } from "@mui/material";
import Header from "./component/Header";

function App() {
  return (
    <div>
      <CssBaseline />
      <Header />
      <MainPage />
    </div>
  );
}

export default App;
