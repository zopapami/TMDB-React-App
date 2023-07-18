import { useEffect, useState } from "react";
import "./App.scss";
import HTTPService from "./services/http.js";

import Sidebar from "./components/Sidebar.js";
import Popup from "./components/Popup.js";
import Pagination from "./components/Pagination.js";

import Logo from "./assets/img/logo.svg";

function App() {
  const [currentGenre, setCurrentGenre] = useState({});
  const [movies, setMovies] = useState([]);
  const [currentMovie, setCurrentMovie] = useState({});
  const [director, setDirector] = useState([]);
  const [cast, setCast] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    // get all movies by genre
    HTTPService.getMoviesByGenre(page, currentGenre.id)
      .then((response) => {
        setMovies(response.data.results);
        setTotalPages(response.data.total_pages);
      })
      .catch((error) => {
        console.error("Error while retrieving the movies", error);
      });
  }, [page, currentGenre.id]);

  // get movie details
  const handleMovieClick = (id) => {
    HTTPService.getMovieDetails(id)
      .then((response) => {
        setCurrentMovie(response.data);
        setDirector(
          response.data.credits.crew.filter((e) => e.job === "Director")
        );
        setCast(response.data.credits.cast.slice(0, 3));
        setIsOpen(true);
      })
      .catch((error) => {
        console.error("Error while retrieving movie details", error);
      });
  };

  // go to top of the page
  const goToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "auto",
    });
  };

  // render
  return (
    <div className="App">
      <div className="logo">
        <img src={Logo} alt="TMDB" />
      </div>
      <div className="content-container">
        <Sidebar
          genre={currentGenre}
          setGenre={setCurrentGenre}
          setPage={setPage}
          goToTop={goToTop}
        />
        <div className="main-content-area">
          <div className="header">
            <h1 className="caps">{currentGenre.name}</h1>
            <Pagination
              totalPages={totalPages}
              page={page}
              setPage={setPage}
              goToTop={goToTop}
            />
          </div>
          <div className="movies">
            {movies.map((e) => (
              <ul key={e.id} onClick={() => handleMovieClick(e.id)}>
                <img
                  src={`https://image.tmdb.org/t/p/w500${e.poster_path}`}
                  alt={e.title}
                />
                <p>{`${e.title} (${e.release_date.substring(0, 4)})`}</p>
              </ul>
            ))}
            {isOpen && (
              <Popup
                movie={currentMovie}
                director={director}
                cast={cast}
                setIsOpen={setIsOpen}
                setGenre={setCurrentGenre}
                setPage={setPage}
                goToTop={goToTop}
              />
            )}
          </div>
          <Pagination
            totalPages={totalPages}
            page={page}
            setPage={setPage}
            goToTop={goToTop}
          />
        </div>
      </div>
    </div>
  );
}

export default App;
