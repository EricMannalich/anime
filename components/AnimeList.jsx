import React, { useRef, useEffect } from "react";
import CardItem from "./CardItem";
import YouTubeVideo from "./YouTubeVideo";
import FilterSearch from "./FilterSearch";
import Box from "@mui/material/Box";
import { FixedSizeList as List } from "react-window";

export default function AnimeList({ entry = "" }) {
  const [selectedAnime, setSelectedAnime] = React.useState(() => {
    return localStorage.getItem("selectedAnime") || null;
  });

  const listRef = useRef();

  // Filtra los animes según la entrada
  const filteredAnimes = FilterSearch(entry);
  const selected = filteredAnimes.find((a) => a.id === selectedAnime);

  // Scroll suave al seleccionar un anime
  useEffect(() => {
    if (selectedAnime && listRef.current) {
      const index = filteredAnimes.findIndex((a) => a.id === selectedAnime);
      if (index >= 0) {
        // Calcula la posición del item
        const itemSize = 140; // Debe coincidir con el valor de itemSize en List
        const scrollTop = index * itemSize;
        // Accede al contenedor DOM de la lista
        const listElement = listRef.current._outerRef;
        if (listElement) {
          listElement.scrollTo({
            top: scrollTop,
            behavior: "smooth",
          });
        }
      }
    }
  }, [selectedAnime, filteredAnimes]);

  // Guarda el anime seleccionado en localStorage cada vez que cambia
  React.useEffect(() => {
    if (selectedAnime) {
      localStorage.setItem("selectedAnime", selectedAnime);
    }
  }, [selectedAnime]);

  // Encuentra el índice del anime seleccionado
  const selectedIndex = filteredAnimes.findIndex((a) => a.id === selectedAnime);

  // Función para seleccionar el siguiente anime
  const handleVideoEnded = () => {
    if (selectedIndex >= 0 && selectedIndex < filteredAnimes.length - 1) {
      setSelectedAnime(filteredAnimes[selectedIndex + 1].id);
    }
  };

  // Renderiza cada fila de la lista virtualizada
  const Row = ({ index, style }) => {
    const anime = filteredAnimes[index];
    return (
      <div style={style} key={anime.id}>
        <CardItem
          id={anime.id}
          name={anime.name}
          genre={anime.genre}
          description={anime.description}
          date={anime.release}
          episodes={anime.episodes}
          image={anime.image || ""}
          selected={selectedAnime}
          setSelected={setSelectedAnime}
        />
      </div>
    );
  };

  useEffect(() => {
    setSelectedAnime(null);
  }, [entry]);

  return (
    <Box sx={{ maxWidth: 1000, margin: "auto" }}>
      {selected?.video && (
        <YouTubeVideo video={selected.video} onEnded={handleVideoEnded} />
      )}
      <List
        ref={listRef}
        height={window.innerHeight - 100}
        itemCount={filteredAnimes.length}
        itemSize={140}
        width={"100%"}
      >
        {Row}
      </List>
    </Box>
  );
}
