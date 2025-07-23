import React from "react";
import {
  Box,
  Card,
  CardContent,
  CardMedia,
  Typography,
  CardActionArea,
} from "@mui/material";
import LinearProgress from "@mui/material/LinearProgress";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
// import FavoriteIcon from "@mui/icons-material/Favorite";

const imageSize = 128;

function getSeason(dateStr) {
  if (!dateStr) return "";
  const [year, month] = dateStr.split("-").map(Number);
  let season = "";
  if ([12, 1, 2].includes(month)) season = "Winter";
  else if ([3, 4, 5].includes(month)) season = "Spring";
  else if ([6, 7, 8].includes(month)) season = "Summer";
  else if ([9, 10, 11].includes(month)) season = "Autumn";
  return `${season} ${year}`;
}

const CardItem = ({
  id = 0,
  image = "",
  name = "",
  genre = [],
  date = "",
  episodes = 0,
  description = "",
  selected = null,
  setSelected = () => {},
  score = 0,
  play = false,
}) => {
  return (
    <Card
      sx={{
        height: imageSize,
        margin: 1,
        border: selected === id ? "2px solid #d24719ff" : "1px solid #444",
        boxShadow: selected === id ? "0 0 8px #d24719ff" : "none",
        backgroundColor:
          selected === id ? "action.selected" : "background.paper",
        transition: "all 0.2s",
      }}
    >
      <CardActionArea onClick={() => setSelected(id)}>
        <Box sx={{ display: "flex", alignItems: "flex-start" }}>
          <CardMedia
            component="img"
            sx={{
              width: imageSize,
              height: imageSize,
              objectFit: "contain",
              flexShrink: 0,
            }}
            image={image}
            alt={name}
          />
          {play && (
            <Box
              sx={{
                position: "absolute",
                top: "50%",
                left: imageSize / 2,
                transform: "translate(-50%, -50%)",
              }}
            >
              <PlayArrowIcon sx={{ fontSize: 40, opacity: 0.8 }} />
            </Box>
          )}

          <CardContent
            sx={{
              marginTop: -0.5,
              flex: "1 1 0",
              padding: 1,
              "&:last-child": { paddingBottom: 1 },
              minWidth: 0,
              display: "flex",
              flexDirection: "column",
              justifyContent: "flex-start",
            }}
          >
            <Typography
              variant="subtitle1"
              component="div"
              sx={{ height: "25px", overflow: "hidden", marginTop: -0.5 }}
            >
              {name}
            </Typography>
            <LinearProgress
              variant="determinate"
              value={score > 3 ? (score - 3) * 14.3 : 0}
              sx={{ height: 2 }}
            />
            <Typography
              variant="subtitle2"
              component="div"
              sx={{ height: "20px", overflow: "hidden" }}
            >
              {genre.map((g) => g.name).join(", ")}
            </Typography>
            <Typography
              variant="body2"
              sx={{
                color: "text.secondary",
                display: "-webkit-box",
                WebkitLineClamp: 3,
                WebkitBoxOrient: "vertical",
                overflow: "hidden",
                textOverflow: "ellipsis",
                minHeight: 60,
                maxWidth: "100%",
                whiteSpace: "normal",
              }}
            >
              {description}
            </Typography>
            <Box sx={{ display: "flex" }}>
              <Typography
                variant="body2"
                component="div"
                sx={{ height: "18px", overflow: "hidden", flexGrow: 1 }}
              >
                {episodes} Ep
              </Typography>
              <Typography
                variant="body2"
                component="div"
                sx={{ height: "18px", overflow: "hidden", flexGrow: 0 }}
              >
                {getSeason(date)}
              </Typography>
            </Box>
          </CardContent>
        </Box>
      </CardActionArea>
    </Card>
  );
};

export default CardItem;
