import React, { Component } from "react";
import axios from "../../node_modules/axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEyeSlash, faTimes } from "@fortawesome/free-solid-svg-icons";

class Watched extends Component {
  constructor(props) {
    super(props);
    this.state = {
      watched: [],
    };
    this.moveToWatchlist = this.moveToWatchlist.bind(this);
    this.getWatched = this.getWatched.bind(this);
    this.removeFromWatched = this.removeFromWatched.bind(this);

    this.getWatched();
  }

  moveToWatchlist(movie) {
    axios
      .put(
        `http://localhost:3000/watched/${movie._id}/${localStorage.getItem(
          "user"
        )}`,
        {},
        {
          headers: {
            Authorization: localStorage.getItem(
              `CognitoIdentityServiceProvider.5erjsnio7ungraibrdt6lsc3u3.${localStorage.getItem(
                "user"
              )}.idToken`
            ),
          },
        }
      )
      .then((data) => {
        console.log(data.data);
      })
      .catch((error) => console.log(error));

    window.location.reload(false);
  }

  removeFromWatched(movie) {
    axios
      .delete(`http://localhost:3000/watched/${movie._id}`, {
        headers: {
          Authorization: localStorage.getItem(
            `CognitoIdentityServiceProvider.5erjsnio7ungraibrdt6lsc3u3.${localStorage.getItem(
              "user"
            )}.idToken`
          ),
        },
      })
      .then((data) => {
        console.log(data.data);
      })
      .catch((error) => console.log(error));
    window.location.reload(false);
  }

  getWatched() {
    axios
      .get(`http://localhost:3000/watched/${localStorage.getItem("user")}`, {
        headers: {
          Authorization: localStorage.getItem(
            `CognitoIdentityServiceProvider.5erjsnio7ungraibrdt6lsc3u3.${localStorage.getItem(
              "user"
            )}.idToken`
          ),
        },
      })
      .then((data) => {
        this.setState({
          watched: data.data,
        });
        console.log(this.state.watched);
      })
      .catch((error) => console.log(error));
  }
  render() {
    return (
      <div>
        <div className="movie-page">
          <div className="container">
            <div className="header">
              <h1 className="heading">My LICA's</h1>
            </div>
            {this.state.watched.length > 0 ? (
              <div className="movie-grid">
                {this.state.watched.map((movie) => (
                  <div className="movie-card" key={movie._id}>
                    <div className="overlay"></div>
                    <div className="poster-wrapper">
                      {movie.image ? (
                        <img
                          src={`https://image.tmdb.org/t/p/w200${movie.image}`}
                          alt={movie._id}
                        />
                      ) : (
                        <div className="filler-poster"></div>
                      )}
                      <div className="inner-card-controls">
                        <>
                          <button
                            onClick={() => {
                              this.moveToWatchlist(movie);
                            }}
                            className="ctrl-btn"
                          >
                            <FontAwesomeIcon icon={faEyeSlash} />
                          </button>
                          <button
                            onClick={() => this.removeFromWatched(movie)}
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
              <h1 className="no-movies">You have not watched LICA's</h1>
            )}
          </div>
        </div>
      </div>
    );
  }
}

export default Watched;
