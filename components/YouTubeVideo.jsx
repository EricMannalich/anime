import React from "react";
import ReactPlayer from "react-player";
import { Card, Box } from "@mui/material";

function extractYoutubeId(url) {
  const regExp =
    /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?|shorts)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/i;
  const match = url.match(regExp);
  return match ? match[1] : null;
}

export default function YouTubeVideo({ video = "", onEnded = () => {} }) {
  const videoId = extractYoutubeId(video);
  const videoUrl = videoId
    ? `https://www.youtube.com/watch?v=${videoId}`
    : null;

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
        {videoUrl ? (
          <ReactPlayer
            src={videoUrl}
            width="100%"
            height="100%"
            style={{
              position: "absolute",
              top: 0,
              left: 0,
            }}
            // controls
            playing={false}
            onEnded={onEnded}
          />
        ) : (
          <Box
            sx={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              backgroundColor: "#1d1d1d",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              // padding: 2,
            }}
          >
            <img
              src="logo.png"
              alt="Anime Logo"
              style={{
                maxWidth: "80%",
                maxHeight: "80%",
                objectFit: "contain",
                borderRadius: 8,
              }}
            />
          </Box>
        )}
      </Box>
    </Card>
  );
}
