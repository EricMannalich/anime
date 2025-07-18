import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { ThemeProvider, createTheme } from "@mui/material/styles";

// Estilo global para fondo oscuro
document.body.style.backgroundColor = "#121212"; // gris oscuro típico de MUI dark

const rootElement = document.getElementById(process.env.PROJECT_NAME);
const root = ReactDOM.createRoot(rootElement);

const customTheme = createTheme({
  palette: {
    mode: "dark",
  },
});
root.render(
  <React.StrictMode>
    <ThemeProvider theme={customTheme}>
      <App />
    </ThemeProvider>
  </React.StrictMode>
);
