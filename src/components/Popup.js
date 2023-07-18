import { useEffect, useState } from "react";
import Close from "../assets/img/close.svg";

function Popup({
  movie,
  director,
  cast,
  setIsOpen,
  setGenre,
  setPage,
  goToTop,
}) {
  // fix the runtime display
  const [isFixed, setIsFixed] = useState(true);

  useEffect(() => {
    if (movie.runtime % 60 < 10) {
      setIsFixed(false);
    }
  }, [movie]);

  const handleHashtagClick = (e) => {
    setIsOpen(false);
    setGenre({ id: e.id, name: e.name });
    setPage(1);
    goToTop();
  };

  // render
  return (
    <div className="popup-container">
      <div className="popup-window">
        <div className="header">
          <h2>{`${movie.title} (${movie.release_date.substring(0, 4)})`}</h2>
          <button onClick={() => setIsOpen(false)}>
            <img src={Close} alt="close" />
          </button>
        </div>

        <img
          src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
          alt={movie.title}
        />

        <div className="details">
          {isFixed ? (
            <p>
              <strong>Διάρκεια: </strong>
              {`${Math.trunc(movie.runtime / 60)}:${movie.runtime % 60}`}
            </p>
          ) : (
            <p>
              <strong>Διάρκεια: </strong>
              {`${Math.trunc(movie.runtime / 60)}:0${movie.runtime % 60}`}
            </p>
          )}
          <p>
            <strong>Σκηνοθέτης: </strong>
            {director[0].name}
          </p>
          <p>
            <strong>Ηθοποιοί: </strong>
            {cast.map((e) => `${e.name} `)}
          </p>
          <p>
            <strong>Περιγραφή </strong>
          </p>
          <p>{movie.overview}</p>
          {movie.genres.map((e) => (
            <span
              key={e.id}
              onClick={() => handleHashtagClick(e)}
            >{`#${e.name} `}</span>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Popup;
