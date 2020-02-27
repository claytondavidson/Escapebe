import { combineReducers } from 'redux';
import alert from './alert';
import auth from './auth';
import dashboard from './dashboard';
import post from './post';
import group from './group';

export default combineReducers({
  alert,
  auth,
  dashboard,
  group,
  post
});
