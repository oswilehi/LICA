import axios from "axios";

//An action is an object that tells the reducer how to change the state
//The reducer tell us how tu store the data
const AppReducer = (state, action) => {
  switch (action.type) {
    case "ADD_TO_WATCHLIST":
      console.log("Bearer " + localStorage.getItem("jwt"));
      axios
        .post(
          "http://localhost:3000/watchlist/",
          {
            id: action.payload.id,
            name: action.payload.original_title,
          },
          {
            headers: {
              authorization: "Bearer " + localStorage.getItem("jwt"),
            },
          }
        )
        .then((data) => console.log(data.data))
        .catch((error) => console.log(error));
      return {
        ...state,
        watchlist: [action.payload, ...state.watchlist],
      };
    case "REMOVE_FROM_WATCHLIST":
      return {
        ...state,
        watchlist: state.watchlist.filter(
          (movie) => movie.id !== action.payload
        ),
      };
    case "ADD_TO_WATCHED":
      return {
        ...state,
        watchlist: state.watchlist.filter(
          (movie) => movie.id !== action.payload.id
        ),
        watched: [action.payload, ...state.watched],
      };
    case "MOVE_TO_WATCHLIST":
      return {
        ...state,
        watched: state.watched.filter(
          (movie) => movie.id !== action.payload.id
        ),
        watchlist: [action.payload, ...state.watchlist],
      };
    case "REMOVE_FROM_WATCHED":
      return {
        ...state,
        watched: state.watched.filter((movie) => movie.id !== action.payload),
      };

    default:
      return state;
  }
};

export default AppReducer;
