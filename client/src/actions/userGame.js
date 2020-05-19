import axios from 'axios';
import { setAlert } from './alert';
import {
  ADD_USER_GAME,
  DELETE_USER_GAME,
  USER_GAME_ERROR,
  GET_USER_GAMES,
  GET_USER_GAME,
  ADD_USER_GAME_FROM_GAMES,
} from './types';

// Get games
export const getUserGames = () => async (dispatch) => {
  try {
    const res = await axios.get('/api/users/userGames');

    dispatch({
      type: GET_USER_GAMES,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: USER_GAME_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

// Get single game
export const getUserGame = (id) => async (dispatch) => {
  try {
    const res = await axios.get(`/api/users/userGames/${id}`);

    dispatch({
      type: GET_USER_GAME,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: USER_GAME_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

// Add game
export const addUserGame = (formData) => async (dispatch) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };
  try {
    const res = await axios.post('/api/users/userGames', formData, config);

    dispatch({
      type: ADD_USER_GAME,
      payload: res.data,
    });

    dispatch(setAlert(`Dodano nową grę: ${res.data.title}`, 'success'));
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, 'danger')));
    }

    dispatch({
      type: USER_GAME_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

// Add UserGame from Games
export const addUserGameFromGames = (id) => async (dispatch) => {
  try {
    const res = await axios.post(`/api/games/${id}`);

    dispatch({
      type: ADD_USER_GAME_FROM_GAMES,
      payload: res.data,
    });

    dispatch(setAlert(`Dodano Grę do ulubionych}`, 'success'));
  } catch (err) {
    dispatch({
      type: USER_GAME_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

// Delete game
export const deleteUserGame = (id) => async (dispatch) => {
  try {
    await axios.delete(`/api/users/userGames/${id}`);

    dispatch({
      type: DELETE_USER_GAME,
      payload: id,
    });

    dispatch(setAlert('Gra usunięta', 'success'));
  } catch (err) {
    dispatch({
      type: USER_GAME_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};
