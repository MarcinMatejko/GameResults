import axios from 'axios';
import { setAlert } from './alert';
import { ADD_GAME, DELETE_GAME, GAME_ERROR, GET_GAMES } from './types';

// Get games
export const getGames = () => async (dispatch) => {
  try {
    const res = await axios.get('/api/games');

    dispatch({
      type: GET_GAMES,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: GAME_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

// Add game
export const addGame = (formData) => async (dispatch) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };
  try {
    const res = await axios.post('/api/games', formData, config);

    dispatch({
      type: ADD_GAME,
      payload: res.data,
    });

    dispatch(setAlert(`Dodano nową grę: ${res.data.title}`, 'success'));
  } catch (err) {
    dispatch({
      type: GAME_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
    dispatch(setAlert('Dodawanie gry nie powiodło się.', 'danger'));
  }
};
