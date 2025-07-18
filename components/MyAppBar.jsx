import * as React from "react";
import { styled, alpha } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import InputBase from "@mui/material/InputBase";
import SearchIcon from "@mui/icons-material/Search";
import CloseIcon from "@mui/icons-material/Close";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import Paper from "@mui/material/Paper";

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(1),
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  width: "100%",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    [theme.breakpoints.up("sm")]: {
      width: "12ch",
      "&:focus": {
        width: "20ch",
      },
    },
  },
}));

const defaultSuggestions = [
  "more than 12 ep",
  "less than 24 ep",
  "between 12 and 24 ep",
  "after 2015",
  "before 2010",
  "between 2012 and 2018",
  "summer 2019",
  "winter 2020",
  "spring 2021",
  "autumn 2018",
];

export default function MyAppBar({ entry = "", setEntry = () => {} }) {
  const [tempEntry, setTempEntry] = React.useState(entry);
  const [suggestions, setSuggestions] = React.useState([]);
  const [selectedIndex, setSelectedIndex] = React.useState(-1);
  const [showSuggestions, setShowSuggestions] = React.useState(false); // <--- NUEVO
  const inputRef = React.useRef();

  // Inicializa localStorage con sugerencias por defecto si no existen
  React.useEffect(() => {
    let history = JSON.parse(localStorage.getItem("searchHistory") || "[]");
    let updated = false;
    defaultSuggestions.forEach((phrase) => {
      if (!history.includes(phrase)) {
        history.push(phrase);
        updated = true;
      }
    });
    if (updated) {
      localStorage.setItem("searchHistory", JSON.stringify(history));
    }
  }, []);

  // Actualiza sugerencias al escribir
  React.useEffect(() => {
    const history = JSON.parse(localStorage.getItem("searchHistory") || "[]");
    if (tempEntry.trim() && showSuggestions) {
      const filtered = history
        .filter((item) => item.toLowerCase().includes(tempEntry.toLowerCase()))
        .slice(0, 5);
      setSuggestions(filtered);
    } else {
      setSuggestions([]);
    }
  }, [tempEntry, showSuggestions]);

  const saveSearch = (value) => {
    if (!value.trim()) return;
    let history = JSON.parse(localStorage.getItem("searchHistory") || "[]");
    history = [value, ...history.filter((item) => item !== value)].slice(0, 10);
    localStorage.setItem("searchHistory", JSON.stringify(history));
  };

  const handleKeyDown = (event) => {
    if (suggestions.length > 0 && showSuggestions) {
      if (event.key === "ArrowDown") {
        setSelectedIndex((prev) => (prev + 1) % suggestions.length);
        event.preventDefault();
        return;
      }
      if (event.key === "ArrowUp") {
        setSelectedIndex(
          (prev) => (prev - 1 + suggestions.length) % suggestions.length
        );
        event.preventDefault();
        return;
      }
      if (event.key === "Enter" && selectedIndex >= 0) {
        const value = suggestions[selectedIndex];
        setTempEntry(value);
        setEntry(value);
        saveSearch(value);
        setSuggestions([]);
        setShowSuggestions(false); // <--- CIERRA EL MENÚ
        setSelectedIndex(-1);
        inputRef.current.blur();
        return;
      }
    }
    if (event.key === "Enter") {
      setEntry(tempEntry);
      saveSearch(tempEntry);
      setSuggestions([]);
      setShowSuggestions(false); // <--- CIERRA EL MENÚ
      setSelectedIndex(-1);
    }
  };

  const handleSuggestionClick = (value) => {
    setTempEntry(value);
    setEntry(value);
    saveSearch(value);
    setSuggestions([]);
    setShowSuggestions(false); // <--- CIERRA EL MENÚ
    setSelectedIndex(-1);
    inputRef.current.blur();
  };

  React.useEffect(() => {
    setSelectedIndex(-1);
  }, [suggestions]);

  // Abre el menú al escribir
  const handleInputChange = (event) => {
    setTempEntry(event.target.value);
    setShowSuggestions(true); // <--- ABRE EL MENÚ
  };

  return (
    <Box sx={{ flexGrow: 1, marginBottom: 8 }}>
      <AppBar position="fixed">
        <Toolbar sx={{ height: 64 }}>
          <Box
            sx={{
              flexGrow: 1,
              display: { xs: "none", sm: "block" },
              marginLeft: -1,
            }}
          >
            <img src={"logo.png"} height={50} />
          </Box>
          <Box sx={{ flexGrow: 1, display: { xs: "block", sm: "none" } }}>
            <img src={"favicon.png"} height={50} />
          </Box>
          <Box sx={{ position: "relative", width: "250px" }}>
            <Search>
              <SearchIconWrapper>
                <SearchIcon />
              </SearchIconWrapper>
              <StyledInputBase
                placeholder="Search"
                inputProps={{ "aria-label": "search" }}
                value={tempEntry}
                onChange={handleInputChange}
                onKeyDown={handleKeyDown}
                inputRef={inputRef}
              />
              {tempEntry && (
                <Box
                  sx={{
                    position: "absolute",
                    right: 8,
                    top: "50%",
                    transform: "translateY(-50%)",
                    cursor: "pointer",
                    color: "grey.400",
                    zIndex: 2,
                  }}
                  onClick={() => {
                    setTempEntry("");
                    setEntry("");
                    setSuggestions([]);
                    setShowSuggestions(false);
                    inputRef.current.focus();
                  }}
                >
                  <CloseIcon />
                </Box>
              )}
            </Search>
            {suggestions.length > 0 && showSuggestions && (
              <Paper
                sx={{
                  position: "absolute",
                  top: "40px",
                  left: 0,
                  right: 0,
                  zIndex: 10,
                  background: "#222",
                }}
              >
                <List>
                  {suggestions.map((item, idx) => (
                    <ListItemButton
                      key={idx}
                      selected={idx === selectedIndex}
                      onClick={() => handleSuggestionClick(item)}
                    >
                      {item}
                    </ListItemButton>
                  ))}
                </List>
              </Paper>
            )}
          </Box>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
