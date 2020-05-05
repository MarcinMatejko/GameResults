import axios from 'axios';
import { setAlert } from './alert';
import { GET_PLAYERS, PLAYER_ERROR, DELETE_PLAYER, ADD_PLAYER } from './types';

// Get players
export const getPlayers = () => async (dispatch) => {
  try {
    const res = await axios.get('/api/users/players');

    dispatch({
      type: GET_PLAYERS,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: PLAYER_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

// Delete player
export const deletePlayer = (id) => async (dispatch) => {
  try {
    const res = await axios.delete(`/api/users/players/${id}`);

    dispatch({
      type: DELETE_PLAYER,
      payload: id,
    });

    dispatch(setAlert('Gracz usunięty', 'success'));
  } catch (err) {
    dispatch({
      type: PLAYER_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

// Add player
export const addPlayer = (formData) => async (dispatch) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };
  try {
    const res = await axios.post('/api/users/players', formData, config);

    dispatch({
      type: ADD_PLAYER,
      payload: res.data,
    });

    dispatch(setAlert('Dodano Gracza', 'success'));
  } catch (err) {
    dispatch({
      type: PLAYER_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};
