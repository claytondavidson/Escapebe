import axios from 'axios';
import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  MEMBER_LOADED,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
  CLEAR_USER
} from './types';
import setToken from '../../utilities/setToken';

export const loadMember = () => async dispatch => {
  if (localStorage.token) {
    try {
      setToken(localStorage.token);
      const res = await axios.get('/api/auth');

      dispatch({
        type: MEMBER_LOADED,
        payload: res.data
      });
    } catch (error) {
      dispatch({
        type: AUTH_ERROR
      });
    }
  } else {
    dispatch({
      type: AUTH_ERROR
    });
  }
};

export const register = ({ username, email, password }) => async dispatch => {
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  };

  const body = JSON.stringify({ username, email, password });

  try {
    const res = await axios.post('/api/members', body, config);

    dispatch({
      type: REGISTER_SUCCESS,
      payload: res.data
    });
    dispatch(loadMember());
  } catch (error) {
    console.error(error);

    dispatch({ type: REGISTER_FAIL });
  }
};

export const login = ({ email, password }) => async dispatch => {
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  };

  const body = JSON.stringify({ email, password });

  try {
    const res = await axios.post('/api/auth', body, config);

    dispatch({
      type: LOGIN_SUCCESS,
      payload: res.data
    });
    dispatch(loadMember());
  } catch (error) {
    console.error(error);
    dispatch({ type: LOGIN_FAIL });
  }
};

export const logout = () => dispatch => {
  dispatch({ type: CLEAR_USER });
  dispatch({ type: LOGOUT });
};
