import {
  GET_PLAYERS,
  PLAYER_ERROR,
  DELETE_PLAYER,
  ADD_PLAYER,
} from '../actions/types';

const initialState = {
  players: [],
  player: null,
  loading: true,
  error: {},
};

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case GET_PLAYERS:
      return {
        ...state,
        players: payload,
        loading: false,
      };
    case ADD_PLAYER:
      return {
        ...state,
        players: [payload, ...state.players],
        loading: false,
      };
    case DELETE_PLAYER:
      return {
        ...state,
        players: state.players.filter((player) => player._id !== payload),
        loading: false,
      };
    case PLAYER_ERROR:
      return {
        ...state,
        error: payload,
        loading: false,
      };
    default:
      return state;
  }
}
