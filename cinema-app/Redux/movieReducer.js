

const initialState = {
  movies: [],
  selectedMovie: null,
  showtimes: [],
  cinemaName: '',
  time: '',
  id: '',
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
    case 'SET_CINEMA_NAME':
      return {
        ...state,
        cinemaName: payload.cinemaName,
      };
    case 'SET_TIME':
      return {
        ...state,
        time: payload.time,
      };
    case 'SET_IDSHOWTIME':
      return {
        ...state,
        id: payload.id,
      };
    default:
      return state;
  }
};

export default movieReducer;