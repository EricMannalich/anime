import React from "react";

export default function OrderSearch({
  filteredAnimes = [],
  sortKey = null,
  sortOrder = "asc",
}) {
  const sortedAnimes = React.useMemo(() => {
    if (!sortKey) return filteredAnimes;
    return [...filteredAnimes].sort((a, b) => {
      const aVal = a[sortKey];
      const bVal = b[sortKey];
      if (sortKey === "release") {
        return sortOrder === "asc"
          ? new Date(aVal) - new Date(bVal)
          : new Date(bVal) - new Date(aVal);
      }
      return sortOrder === "asc"
        ? aVal > bVal
          ? 1
          : -1
        : aVal < bVal
        ? 1
        : -1;
    });
  }, [filteredAnimes, sortKey, sortOrder]);

  return sortedAnimes;
}
