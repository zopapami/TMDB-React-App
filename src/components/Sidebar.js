import { useEffect, useState } from "react";
import HTTPService from "../services/http.js";

function Sidebar({ genre, setGenre, setPage, goToTop }) {
  const [genres, setGenres] = useState([]);

  useEffect(() => {
    // get all genres
    HTTPService.getGenres()
      .then((response) => {
        setGenres(response.data.genres);
      })
      .catch((error) => {
        console.error("Error while retrieving the genres", error);
      });
  }, []);

  // sort genres alphabetically
  genres.sort((a, b) => a.name.localeCompare(b.name));

  // set the current genre
  const handleGenreClick = (e) => {
    setGenre({ id: e.id, name: e.name });
    setPage(1);
    goToTop();
  };

  // render
  return (
    <div className="sidebar">
      {genres.map((e) => (
        <ul
          className={`${e.id === genre.id ? "active" : ""} caps`}
          key={e.id}
          onClick={() => handleGenreClick(e)}
        >
          {e.name}
        </ul>
      ))}
    </div>
  );
}

export default Sidebar;
