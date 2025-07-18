import React from "react";
import { Card, Box } from "@mui/material";

function extractYoutubeId(url) {
  const regExp =
    /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?|shorts)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/i;
  const match = url.match(regExp);
  return match ? match[1] : null;
}

export default function YouTubeVideo({ video, title = "Anime Video" }) {
  if (!video) return null;
  const videoId = extractYoutubeId(video);
  if (!videoId) return null;
  const embedUrl = `https://www.youtube.com/embed/${videoId}?autoplay=1`;

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
        <iframe
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            border: 0,
          }}
          src={embedUrl}
          title={title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
      </Box>
    </Card>
  );
}
