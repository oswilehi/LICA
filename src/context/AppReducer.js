//An action is an object that tells the reducer how to change the state
//The reducer tell us how tu store the data
const AppReducer = (state, action) => {
  switch (action.type) {
    case "ADD_TO_WATCHLIST":
      return {
        ...state,
        watchlist: [action.payload, ...state.watchlist],
      };
    case "REMOVE_FROM_WATCHLIST":
      return {
        ...state,
        watchlist: state.watchlist.splice(action.payload, 1),
      };
    case "ADD_TO_WATCHED":
      return {
        ...state,
        watched: [action.payload, ...state.watched],
        watchlist: state.watchlist.splice(action.payload.id, 1),
      };
    case "MOVE_TO_WATCHLIST":
      return {
        ...state,
        watchlist: [action.payload, ...state.watchlist],
        watched: state.watched.splice(action.payload.id, 1),
      };
    case "REMOVE_FROM_WATCHED":
      return {
        ...state,
        watched: state.watched.splice(action.payload, 1),
      };

    default:
      return state;
  }
};

export default AppReducer;
