import { ADD_GAME, DELETE_GAME, GAME_ERROR, GET_GAMES } from '../actions/types';

const initialState = {
  games: [],
  loading: true,
  error: {},
};

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case GET_GAMES:
      return {
        ...state,
        games: payload,
        loading: false,
      };
    case ADD_GAME:
      return {
        ...state,
        games: [...state.games, payload],
        loading: false,
      };
    case DELETE_GAME:
      return {
        ...state,
        games: state.games.filter((game) => game._id !== payload),
        loading: false,
      };
    case GAME_ERROR:
      return {
        ...state,
        error: payload,
        loading: false,
      };
    default:
      return state;
  }
}
