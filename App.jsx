import React from "react";
import MyAppBar from "./components/MyAppBar";
import AnimeList from "./components/AnimeList";

function App() {
  const [entry, setEntry] = React.useState("");
  return (
    <>
      <MyAppBar setEntry={setEntry} />
      <AnimeList entry={entry} />
    </>
  );
}

export default App;
