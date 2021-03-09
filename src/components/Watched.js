import React, { useContext } from "react";
import { GlobalContext } from "../context/GlobalState";
import AddedMovie from "./AddedMovie";

const Watched = () => {
  const { watched } = useContext(GlobalContext);
  return (
    <div>
      <div className="movie-page">
        <div className="container">
          <div className="header">
            <h1 className="heading">My LICA's</h1>
          </div>
          {watched.length > 0 ? (
            <div className="movie-grid">
              {watched.map((movie) => (
                <AddedMovie movie={movie} type="watched" />
              ))}
            </div>
          ) : (
            <h1 className="no-movies">You have not watched LICA's</h1>
          )}
        </div>
      </div>
    </div>
  );
};

export default Watched;
