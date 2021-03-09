import React from "react";
import Controls from "./Controls";

//Por que entre llaves?????
const AddedMovie = ({ movie, type }) => {
  return (
    <div className="movie-card">
      <div className="overlay"></div>
      <div className="poster-wrapper">
        {movie.poster_path ? (
          <img
            src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
            alt={movie.title}
          />
        ) : (
          <div className="filler-poster"></div>
        )}
        <Controls type={type} movie={movie} />
      </div>
    </div>
  );
};

export default AddedMovie;
