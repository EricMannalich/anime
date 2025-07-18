import React from "react";
import MyAppBar from "./components/MyAppBar";
import AnimeList from "./components/AnimeList";

function App() {
  // Lee el valor inicial de localStorage
  const [entry, setEntry] = React.useState(
    // ""
    () => {
      return localStorage.getItem("lastEntry") || "";
    }
  );

  // Función intermediaria para guardar y actualizar entry
  const handleEntryChange = (value) => {
    localStorage.setItem("lastEntry", value);
    setEntry(value);
  };

  return (
    <>
      <MyAppBar entry={entry} setEntry={handleEntryChange} />
      <AnimeList entry={entry} />
    </>
  );
}

export default App;
