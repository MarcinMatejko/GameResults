import { combineReducers } from 'redux';
import alert from './alert';
import auth from './auth';
import profile from './profile';
import player from './player';
import game from './game';

export default combineReducers({
  alert,
  auth,
  profile,
  player,
  game,
});
