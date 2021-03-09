import React, { useContext } from "react";
import { GlobalContext } from "../context/GlobalState";
import AddedMovie from "./AddedMovie";

const Watchlist = () => {
  const { watchlist } = useContext(GlobalContext);
  return (
    <div className="movie-page">
      <div className="container">
        <div className="header">
          <h1 className="heading">My LICA's</h1>
        </div>
        {watchlist.length > 0 ? (
          <div className="movie-grid">
            {watchlist.map((movie) => (
              <AddedMovie movie={movie} type="watchlist" />
            ))}
          </div>
        ) : (
          <h1 className="no-movies">There are no LICA's</h1>
        )}
      </div>
    </div>
  );
};

export default Watchlist;
