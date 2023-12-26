

const initialState = {
    movies: [],
    selectedMovie: null,
    showtimes: [],
    stateSeat: 'n',
  };
  
  const movieReducer = (state = initialState, payload) => {
    switch (payload.type) {
      case 'SET_MOVIES':
        return {
          ...state,
          movies: payload.movies,
        };
      case 'SELECT_MOVIE':
        return {
          ...state,
          selectedMovie: payload.selectedMovie,
        };
      case 'SET_SHOWTIME':
        return {
          ...state, 
          showtimes: payload.showtimes,
        };
      case 'SET_STATE_SEAT':
        return {
          ...state,
          stateSeat: payload.stateSeat,
        };
      default:
        return state;
    }
  };
  
  export default movieReducer;