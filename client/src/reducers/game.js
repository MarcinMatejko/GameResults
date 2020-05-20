import {
  ADD_GAME,
  DELETE_GAME,
  GAME_ERROR,
  GET_GAMES,
  GET_GAME,
} from '../actions/types';

const initialState = {
  games: [],
  game: null,
  loading: true,
  error: {},
  isCreated: null,
};

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case GET_GAMES:
      return {
        ...state,
        games: payload,
        loading: false,
        isCreated: null,
      };
    case GET_GAME:
      return {
        ...state,
        game: payload,
        loading: false,
        isCreated: null,
      };
    case ADD_GAME:
      return {
        ...state,
        games: [...state.games, payload],
        loading: false,
        isCreated: true,
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
