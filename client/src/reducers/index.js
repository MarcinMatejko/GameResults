import { combineReducers } from 'redux';
import alert from './alert';
import auth from './auth';
import profile from './profile';
import player from './player';
import game from './game';
import userGame from './userGame';

export default combineReducers({
  alert,
  auth,
  profile,
  player,
  game,
  userGame,
});
