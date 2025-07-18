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
    primary: {
      main: "#ffd000ff", // Sunset orange
    },
    secondary: {
      main: "#f53500ff", // Rich orange
    },
    background: {
      default: "#121212", // Page background
      paper: "#1d1d1d", // Surface elements
    },
  },
});
root.render(
  <React.StrictMode>
    <ThemeProvider theme={customTheme}>
      <App />
    </ThemeProvider>
  </React.StrictMode>
);
