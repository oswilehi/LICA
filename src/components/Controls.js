import React, { Fragment, useContext } from "react";
import { GlobalContext } from "../context/GlobalState";

const Controls = ({ movie, type }) => {
  const {
    removeFromWatchlist,
    addToWatched,
    moveToWatchlist,
    removeFromWatched,
  } = useContext(GlobalContext);

  return (
    <div className="inner-card-controls">
      {type === "watchlist" && (
        <Fragment>
          <button onClick={() => addToWatched(movie)} className="ctrl-btn">
            <i className="fa-fw far fa-eye"></i>
          </button>
          <button
            onClick={() => removeFromWatchlist(movie.id)}
            className="ctrl-btn"
          >
            <i className="fa-fw fa fa-times"></i>
          </button>
        </Fragment>
      )}

      {type === "watched" && (
        <Fragment>
          <button onClick={() => moveToWatchlist(movie)} className="ctrl-btn">
            <i className="fa-fw far fa-eye-slash"></i>
          </button>
          <button
            onClick={() => removeFromWatched(movie.id)}
            className="ctrl-btn"
          >
            <i className="fa-fw fa fa-times"></i>
          </button>
        </Fragment>
      )}
    </div>
  );
};

export default Controls;
