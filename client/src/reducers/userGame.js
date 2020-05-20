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
  isDeleted: null,
  isCreated: null,
};

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case GET_USER_GAMES:
      return {
        ...state,
        userGames: payload,
        loading: false,
        isDeleted: null,
        isCreated: null,
      };
    case GET_USER_GAME:
      return {
        ...state,
        userGame: payload,
        loading: false,
        isDeleted: null,
        isCreated: null,
      };
    case ADD_USER_GAME:
      return {
        ...state,
        userGames: [...state.userGames, payload],
        loading: false,
        isCreated: true,
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
        isDeleted: true,
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
