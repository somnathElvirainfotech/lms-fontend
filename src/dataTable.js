import React from "react";

export const columns = [
  {
    name: "Title",
    selector: "title",
    sortable: true
  },
  {
    name: "Director",
    selector: "director",
    sortable: true
  },
  {
    name: "Genres",
    selector: "genres",
    sortable: true,
    cell: d => <span>{d.genres.join(", ")}</span>
  },
  {
    name: "Year",
    selector: "year",
    sortable: true
  }
];


