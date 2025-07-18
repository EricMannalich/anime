import React, { useEffect, useRef } from "react";
import { Card, Box } from "@mui/material";

function extractYoutubeId(url) {
  const regExp =
    /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?|shorts)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/i;
  const match = url.match(regExp);
  return match ? match[1] : null;
}

export default function YouTubeVideo({
  video,
  title = "Anime Video",
  onEnded,
}) {
  const playerRef = useRef(null);
  const videoId = extractYoutubeId(video);

  useEffect(() => {
    if (!videoId) return;

    // Carga la API de YouTube si no está cargada
    if (!window.YT) {
      const tag = document.createElement("script");
      tag.src = "https://www.youtube.com/iframe_api";
      document.body.appendChild(tag);
    }

    // Espera a que la API esté lista
    window.onYouTubeIframeAPIReady = () => {
      if (playerRef.current) {
        playerRef.current = new window.YT.Player("yt-player", {
          videoId,
          events: {
            onStateChange: (event) => {
              // 0 significa que terminó el video
              if (event.data === window.YT.PlayerState.ENDED && onEnded) {
                onEnded();
              }
            },
          },
          playerVars: {
            autoplay: 1,
          },
        });
      }
    };

    // Si la API ya está cargada
    if (window.YT && window.YT.Player) {
      if (playerRef.current) {
        playerRef.current = new window.YT.Player("yt-player", {
          videoId,
          events: {
            onStateChange: (event) => {
              if (event.data === window.YT.PlayerState.ENDED && onEnded) {
                onEnded();
              }
            },
          },
          playerVars: {
            autoplay: 1,
          },
        });
      }
    }

    // Limpieza
    return () => {
      if (playerRef.current && playerRef.current.destroy) {
        playerRef.current.destroy();
      }
    };
  }, [videoId, onEnded]);

  return (
    <Card sx={{ marginTop: 2, marginLeft: 1, marginRight: 1 }}>
      <Box
        sx={{
          position: "relative",
          width: "100%",
          paddingTop: "56.25%",
          borderRadius: 2,
          overflow: "hidden",
        }}
      >
        <div
          id="yt-player"
          ref={playerRef}
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            border: 0,
          }}
        />
      </Box>
    </Card>
  );
}
