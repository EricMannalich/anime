import React from "react";
import SpeedDial from "@mui/material/SpeedDial";
import SpeedDialAction from "@mui/material/SpeedDialAction";
import SortIcon from "@mui/icons-material/Sort";
import Box from "@mui/material/Box";
import SortByAlphaIcon from "@mui/icons-material/SortByAlpha";
import EventIcon from "@mui/icons-material/Event";
import ExplicitIcon from "@mui/icons-material/Explicit";
import StarIcon from "@mui/icons-material/Star";

const getColor = (currentKey, selectedKey, order) => {
  if (currentKey !== selectedKey) return "disabled";
  return order === "asc" ? "primary" : "secondary";
};

const sortOptions = [
  { key: "name", label: "Name", icon: SortByAlphaIcon },
  { key: "release", label: "Release Date", icon: EventIcon },
  { key: "episodes", label: "Episodes", icon: ExplicitIcon },
  { key: "punctuation", label: "Score", icon: StarIcon },
];
export default function MySpeedDial({
  sortKey = null,
  setSortKey = () => {},
  sortOrder = "asc",
  setSortOrder = () => {},
}) {
  return (
    <Box sx={{ position: "fixed", bottom: 16, left: 16 }}>
      <SpeedDial ariaLabel="Sort Animes" icon={<SortIcon />} direction="up">
        {sortOptions.map(({ key, label, icon: Icon }) => {
          const color = getColor(key, sortKey, sortOrder);
          return (
            <SpeedDialAction
              key={key}
              icon={<Icon color={color} />}
              tooltipTitle={`${label} (${
                sortKey === key
                  ? sortOrder === "asc"
                    ? "Ascending"
                    : "Descending"
                  : "Inactive"
              })`}
              onClick={() => {
                if (sortKey === key) {
                  setSortOrder(sortOrder === "asc" ? "desc" : "asc");
                } else {
                  setSortKey(key);
                  setSortOrder("asc");
                }
              }}
            />
          );
        })}
      </SpeedDial>
    </Box>
  );
}
