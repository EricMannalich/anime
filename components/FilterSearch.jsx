import React from "react";
import animes from "../anime_db.json";

function getSeason(dateStr) {
  if (!dateStr) return "";
  const [year, month] = dateStr.split("-").map(Number);
  let season = "";
  if ([12, 1, 2].includes(month)) season = "winter";
  else if ([3, 4, 5].includes(month)) season = "spring";
  else if ([6, 7, 8].includes(month)) season = "summer";
  else if ([9, 10, 11].includes(month)) season = "autumn";
  return `${season} ${year}`;
}

export default function FilterSearch(entry = "") {
  const search = entry.trim().toLowerCase();

  // Detecta patrones especiales para episodios
  const moreMatch = search.match(/more than (\d+) ep?/);
  const lessMatch = search.match(/less than (\d+) ep?/);
  const betweenMatch = search.match(/between (\d+) and (\d+) ep?/);

  // Detecta patrones especiales para fechas
  const afterMatch = search.match(/after (\d{4})/);
  const beforeMatch = search.match(/before (\d{4})/);
  const dateBetweenMatch = search.match(/between (\d{4}) and (\d{4})/);
  const seasonYearMatch = search.match(/(winter|spring|summer|autumn) (\d{4})/);

  const filteredAnimes = React.useMemo(() => {
    if (!search) return animes;

    // Filtro especial: si la búsqueda es una sola letra o número
    if (/^[a-z0-9]$/i.test(search)) {
      return animes.filter((anime) =>
        anime.name?.toLowerCase().startsWith(search)
      );
    }

    // Filtro especial para episodios
    if (moreMatch) {
      const min = parseInt(moreMatch[1], 10);
      return animes.filter((anime) => anime.episodes > min);
    }
    if (lessMatch) {
      const max = parseInt(lessMatch[1], 10);
      return animes.filter((anime) => anime.episodes < max);
    }
    if (betweenMatch) {
      const min = parseInt(betweenMatch[1], 10);
      const max = parseInt(betweenMatch[2], 10);
      return animes.filter(
        (anime) => anime.episodes >= min && anime.episodes <= max
      );
    }

    // Filtro especial para fechas
    if (afterMatch) {
      const year = parseInt(afterMatch[1], 10);
      return animes.filter((anime) => {
        const animeYear = parseInt(anime.release?.split("-")[0], 10);
        return animeYear > year;
      });
    }
    if (beforeMatch) {
      const year = parseInt(beforeMatch[1], 10);
      return animes.filter((anime) => {
        const animeYear = parseInt(anime.release?.split("-")[0], 10);
        return animeYear < year;
      });
    }
    if (dateBetweenMatch) {
      const min = parseInt(dateBetweenMatch[1], 10);
      const max = parseInt(dateBetweenMatch[2], 10);
      return animes.filter((anime) => {
        const animeYear = parseInt(anime.release?.split("-")[0], 10);
        return animeYear >= min && animeYear <= max;
      });
    }
    if (seasonYearMatch) {
      const season = seasonYearMatch[1];
      const year = seasonYearMatch[2];
      return animes.filter(
        (anime) => getSeason(anime.release) === `${season} ${year}`
      );
    }

    // Filtro de texto completo
    return animes.filter((anime) => {
      const name = anime.name?.toLowerCase() || "";
      const release = anime.release?.toLowerCase() || "";
      const description = anime.description?.toLowerCase() || "";
      const genres = (anime.genre || [])
        .map((g) => g.name?.toLowerCase() || "")
        .join(" ");
      const seasonYear = getSeason(anime.release);
      return (
        name.includes(search) ||
        release.includes(search) ||
        description.includes(search) ||
        genres.includes(search) ||
        seasonYear.includes(search)
      );
    });
  }, [search]);

  return filteredAnimes;
}
