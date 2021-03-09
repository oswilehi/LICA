import React, { useContext } from "react";
import { GlobalContext } from "../context/GlobalState";

const MovieCard = ({ movie }) => {
  //Get action from GlobalState
  const { addToWatchlist, watchlist, watched } = useContext(GlobalContext);

  //Search if a movie is already stored
  let storedMovie = watchlist.find((o) => o.id === movie.id);
  let storedWatched = watched.find((o) => o.id === movie.id);

  const watchlistDisabled = storedMovie ? true : storedWatched ? true : false;

  return (
    <div className="result-card">
      <div className="poster-wrapper">
        {movie.poster_path ? (
          <img
            src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
            alt={movie.title}
          />
        ) : (
          <div className="filler-poster"></div>
        )}
      </div>
      <div className="info">
        <div className="header">
          <h3 className="title">{movie.title}</h3>
          <h4 className="release-date">
            {movie.release_date ? movie.release_date.substring(0, 4) : `-`}
          </h4>
        </div>
        <div className="controls">
          <button
            className="btn"
            disabled={watchlistDisabled}
            onClick={() => addToWatchlist(movie)}
          >
            Add to watchlist
          </button>
        </div>
      </div>
    </div>
  );
};

export default MovieCard;
