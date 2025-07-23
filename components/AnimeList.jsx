import React, { useRef, useEffect } from "react";
import CardItem from "./CardItem";
import YouTubeVideo from "./YouTubeVideo";
import FilterSearch from "./FilterSearch";
import OrderSearch from "./OrderSearch";
import MySpeedDial from "./MySpeedDial";
import Box from "@mui/material/Box";
import Fab from "@mui/material/Fab";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import Zoom from "@mui/material/Zoom";
import { FixedSizeList as List } from "react-window";
import useListScrollTrigger from "./useListScrollTrigger";
import Grid from "@mui/material/Grid";

export default function AnimeList({ entry = "" }) {
  const [selectedAnime, setSelectedAnime] = React.useState(() => {
    return localStorage.getItem("selectedAnime") || null;
  });
  const [sortKey, setSortKey] = React.useState(null);
  const [sortOrder, setSortOrder] = React.useState("asc");

  const listRef = useRef();
  const showScrollButton = useListScrollTrigger(listRef);

  // Filtra los animes según la entrada
  const filteredAnimes = FilterSearch(entry);

  const sortedAnimes = OrderSearch({
    filteredAnimes,
    sortKey,
    sortOrder,
  });
  const selected = sortedAnimes.find((a) => a.id === selectedAnime);

  // Scroll suave al seleccionar un anime
  useEffect(() => {
    if (selectedAnime && listRef.current) {
      const index = sortedAnimes.findIndex((a) => a.id === selectedAnime);
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
  }, [selectedAnime, sortedAnimes]);

  // Guarda el anime seleccionado en localStorage cada vez que cambia
  React.useEffect(() => {
    if (selectedAnime) {
      localStorage.setItem("selectedAnime", selectedAnime);
    }
  }, [selectedAnime]);

  // Encuentra el índice del anime seleccionado
  const selectedIndex = sortedAnimes.findIndex((a) => a.id === selectedAnime);

  // Función para seleccionar el siguiente anime
  const handleVideoEnded = () => {
    if (selectedIndex >= 0 && selectedIndex < sortedAnimes.length - 1) {
      setSelectedAnime(sortedAnimes[selectedIndex + 1].id);
    }
  };

  // Renderiza cada fila de la lista virtualizada
  const Row = ({ index, style }) => {
    const anime = sortedAnimes[index];
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

  const scrollToTop = () => {
    if (listRef.current) {
      const listElement = listRef.current._outerRef;
      if (listElement) {
        listElement.scrollTo({
          top: 0,
          behavior: "smooth",
        });
      }
    }
  };

  useEffect(() => {
    setSelectedAnime(null);
    scrollToTop();
  }, [sortedAnimes]);

  const videoRef = React.useRef(null);
  const [videoHeight, setVideoHeight] = React.useState(0);
  useEffect(() => {
    const updateHeight = () => {
      if (videoRef.current) {
        const rect = videoRef.current.getBoundingClientRect();
        setVideoHeight(rect.height);
      }
    };

    updateHeight(); // Medición inicial

    window.addEventListener("resize", updateHeight); // Actualización dinámica

    return () => {
      window.removeEventListener("resize", updateHeight); // Limpieza
    };
  }, []); // Sin dependencia de video

  return (
    <Box sx={{ maxWidth: 1600, margin: "auto" }}>
      <Grid container spacing={0}>
        <Grid size={{ xs: 12, sm: 6, md: 6, lg: 6 }}>
          <div ref={videoRef}>
            <YouTubeVideo
              video={selected?.video || ""}
              onEnded={handleVideoEnded}
            />
          </div>
        </Grid>
        <Grid size={{ xs: 12, sm: 6, md: 6, lg: 6 }}>
          <List
            ref={listRef}
            height={window.innerHeight - 75}
            itemCount={sortedAnimes.length}
            itemSize={140}
            width={"100%"}
          >
            {Row}
          </List>
        </Grid>
      </Grid>
      <MySpeedDial
        sortKey={sortKey}
        setSortKey={setSortKey}
        sortOrder={sortOrder}
        setSortOrder={setSortOrder}
      />
      <Zoom in={showScrollButton}>
        <Fab
          color="primary"
          aria-label="Scroll to Top"
          onClick={scrollToTop}
          sx={{ position: "fixed", bottom: 16, right: 16 }}
        >
          <KeyboardArrowUpIcon />
        </Fab>
      </Zoom>
    </Box>
  );
}
