import { combineReducers } from 'redux';
import alert from './alert';
import auth from './auth';
import profile from './profile';
import player from './player';

export default combineReducers({
  alert,
  auth,
  profile,
  player,
});
