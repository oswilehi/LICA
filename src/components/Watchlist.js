import React, { Component } from "react";
import axios from "../../node_modules/axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faTimes } from "@fortawesome/free-solid-svg-icons";

class Watchlist extends Component {
  constructor(props) {
    super(props);
    this.state = {
      watchlist: [],
    };
    this.addToWatched = this.addToWatched.bind(this);
    this.getWatchlist = this.getWatchlist.bind(this);
    this.removeFromWatchlist = this.removeFromWatchlist.bind(this);

    this.getWatchlist();
  }

  addToWatched(movie) {
    axios
      .put(`http://localhost:3000/watchlist/${movie._id}`)
      .then((data) => {
        console.log(data.data);
      })
      .catch((error) => console.log(error));

    window.location.reload(false);
  }

  removeFromWatchlist(movie) {
    axios
      .delete(`http://localhost:3000/watchlist/${movie._id}`)
      .then((data) => {
        console.log(data.data);
      })
      .catch((error) => console.log(error));
    window.location.reload(false);
  }

  getWatchlist() {
    axios
      .get(`http://localhost:3000/watchlist/`)
      .then((data) => {
        this.setState({
          watchlist: data.data,
        });
        console.log(this.state.watchlist);
      })
      .catch((error) => console.log(error));
  }

  render() {
    return (
      <div className="movie-page">
        <div className="container">
          <div className="header">
            <h1 className="heading">My LICA's</h1>
          </div>
          {this.state.watchlist.length > 0 ? (
            <div className="movie-grid">
              {this.state.watchlist.map((movie) => (
                <div className="movie-card" key={movie._id}>
                  <div className="overlay"></div>
                  <div className="poster-wrapper">
                    {movie.image ? (
                      <img
                        src={`https://image.tmdb.org/t/p/w200${movie.image}`}
                        alt={movie.id}
                      />
                    ) : (
                      <div className="filler-poster"></div>
                    )}
                    <div className="inner-card-controls">
                      <>
                        <button
                          onClick={() => {
                            this.addToWatched(movie);
                          }}
                          className="ctrl-btn"
                        >
                          <FontAwesomeIcon icon={faEye} />
                        </button>
                        <button
                          onClick={() => this.removeFromWatchlist(movie)}
                          className="ctrl-btn"
                        >
                          <FontAwesomeIcon icon={faTimes} />
                        </button>
                      </>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <h1 className="no-movies">There are no LICA's</h1>
          )}
        </div>
      </div>
    );
  }
}

export default Watchlist;
