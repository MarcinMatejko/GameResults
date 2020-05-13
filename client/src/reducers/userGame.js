import {
  ADD_USER_GAME,
  ADD_USER_GAME_FROM_GAMES,
  DELETE_USER_GAME,
  USER_GAME_ERROR,
  GET_USER_GAMES,
  GET_USER_GAME,
} from '../actions/types';

const initialState = {
  userGames: [],
  userGame: null,
  loading: true,
  error: {},
};

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case GET_USER_GAMES:
      return {
        ...state,
        userGames: payload,
        loading: false,
      };
    case GET_USER_GAME:
      return {
        ...state,
        userGame: payload,
        loading: false,
      };
    case ADD_USER_GAME:
      return {
        ...state,
        userGames: [...state.userGames, payload],
        loading: false,
      };
    case ADD_USER_GAME_FROM_GAMES:
      return {
        ...state,
        userGames: [...state.userGames, payload],
        loading: false,
      };
    case DELETE_USER_GAME:
      return {
        ...state,
        userGames: state.userGames.filter((game) => game._id !== payload),
        loading: false,
      };
    case USER_GAME_ERROR:
      return {
        ...state,
        error: payload,
        loading: false,
      };
    default:
      return state;
  }
}
