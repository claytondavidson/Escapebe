import { combineReducers } from 'redux';
import auth from './auth';
import dashboard from './dashboard';
import group from './group';

export default combineReducers({
  auth,
  dashboard,
  group
});
