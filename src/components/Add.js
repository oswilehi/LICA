import React, { Component } from "react";
import key from "../key";
import axios from "../../node_modules/axios";

class Add extends Component {
  constructor(props) {
    super(props);
    this.state = {
      movie: [],
      moviesFound: [],
      pages: 1,
      actualPage: 1,
    };
    this.getMovie = this.getMovie.bind(this);
    this.renderSearchedMovies = this.renderSearchedMovies.bind(this);
    this.renderPagination = this.renderPagination.bind(this);
    this.changePage = this.changePage.bind(this);
    this.addToWachtlist = this.addToWachtlist.bind(this);
  }

  async addToWachtlist(movie) {
    axios
      .post(
        "http://localhost:3000/watchlist/",
        {
          id: movie.id,
          image: movie.poster_path,
          user: localStorage.getItem("user"),
        },
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
  }

  getMovie(e) {
    e.preventDefault();

    this.setState({
      moviesFound: [],
    });
    fetch(
      `https://api.themoviedb.org/3/search/movie?api_key=${key.REACT_APP_TMDB_KEY}&language=en-US&page=${this.state.actualPage}&include_adult=false&query=${this.state.searchedMovie}`
    )
      .then((res) => res.json())
      .then((data) => {
        if (!data.errors) {
          console.log(data.results);
          this.setState({
            moviesFound: data.results,
            pages: data.total_pages,
          });
        } else {
          console.log(data.errors);
        }
      });

    this.setState({
      searchedMovie: e.target.value,
    });
  }

  changePage(page) {
    this.setState({
      actualPage: page,
      moviesFound: [],
    });
    fetch(
      `https://api.themoviedb.org/3/search/movie?api_key=${key.REACT_APP_TMDB_KEY}&language=en-US&page=${page}&include_adult=false&query=${this.state.searchedMovie}`
    )
      .then((res) => res.json())
      .then((data) => {
        if (!data.errors) {
          console.log(data);
          this.setState({
            moviesFound: data.results,
            pages: data.total_pages,
          });
        } else {
          console.log(data.errors);
        }
      });
  }

  renderSearchedMovies() {
    return this.state.moviesFound.map((movie) => (
      <li key={movie.id}>
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
                onClick={(e) => {
                  e.preventDefault();
                  this.addToWachtlist(movie);
                }}
                disabled={movie.addedToWatchlist ? true : false}
              >
                Add to watchlist
              </button>
            </div>
          </div>
        </div>
      </li>
    ));
  }

  renderPagination() {
    return (
      <button
        className="page-link"
        onClick={() => {
          this.changePage(this.state.actualPage);
        }}
      >
        {this.state.actualPage}
      </button>
    );
  }

  render() {
    return (
      <div className="add-page">
        <div className="container">
          <div className="add-content">
            <div className="input-wrapper">
              <input
                type="text"
                placeholder="Search"
                onChange={this.getMovie}
              />
            </div>
            {this.state.moviesFound.length > 0 && (
              <ul className="results">{this.renderSearchedMovies()}</ul>
            )}
          </div>
          <div className="d-flex justify-content-center">
            {this.state.pages > 1 && (
              <nav aria-label="Page navigation example">
                <ul className="pagination">
                  <li className="page-item">
                    <button
                      className="page-link"
                      onClick={() => {
                        this.changePage(this.state.actualPage - 1);
                      }}
                    >
                      Previous
                    </button>
                  </li>
                  {this.renderPagination(
                    this.state.pages,
                    this.state.actualPage
                  )}
                  <li className="page-item">
                    <button
                      className="page-link"
                      onClick={() => {
                        this.changePage(this.state.actualPage + 1);
                      }}
                    >
                      Next
                    </button>
                  </li>
                </ul>
              </nav>
            )}
          </div>
        </div>
      </div>
    );
  }
}

export default Add;
