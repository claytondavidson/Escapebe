import axios from 'axios';

import {
  GET_DASHBOARD,
  DASHBOARD_ERROR,
  GET_DASHBOARDS,
  CLEAR_MEMBER,
} from './types';

export const getCurrentDashboard = () => async (dispatch) => {
  try {
    const res = await axios.get('/api/dashboard/member');

    dispatch({
      type: GET_DASHBOARD,
      payload: res.data,
    });
  } catch (error) {
    dispatch({
      type: DASHBOARD_ERROR,
      payload: { msg: error.response.data.msg, status: error.response.status },
    });
  }
};

export const getDashboards = () => async (dispatch) => {
  dispatch({ type: CLEAR_MEMBER });

  try {
    const res = await axios.get('/api/dashboard');

    dispatch({
      type: GET_DASHBOARDS,
      payload: res.data,
    });
  } catch (error) {
    dispatch({
      type: DASHBOARD_ERROR,
      payload: {
        msg: error.response.statusText,
        status: error.response.status,
      },
    });
  }
};

export const getDashboardById = (memberId) => async (dispatch) => {
  dispatch({ type: CLEAR_MEMBER });

  try {
    const res = await axios.get(`/api/dashboard/members/${memberId}`);

    dispatch({
      type: GET_DASHBOARDS,
      payload: res.data,
    });
  } catch (error) {
    dispatch({
      type: DASHBOARD_ERROR,
      payload: {
        msg: error.response.statusText,
        status: error.response.status,
      },
    });
  }
};

export const createDashboard = (dashboardData, history) => async (dispatch) => {
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const res = await axios.post('/api/dashboard', dashboardData, config);
    dispatch({
      type: GET_DASHBOARD,
      payload: res.data,
    });

    history.push('/dashboard');
  } catch (error) {
    dispatch({
      type: DASHBOARD_ERROR,
      payload: {
        msg: error.response.statusText,
        status: error.response.status,
      },
    });
  }
};
