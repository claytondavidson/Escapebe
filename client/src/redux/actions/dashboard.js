import axios from 'axios';

import { GET_DASHBOARD, DASHBOARD_ERROR } from './types';

export const getCurrentDashboard = () => async dispatch => {
  try {
    const res = await axios.get('/api/dashboard/member');

    dispatch({
      type: GET_DASHBOARD,
      payload: res.data
    });
  } catch (error) {
    dispatch({
      type: DASHBOARD_ERROR,
      payload: { msg: error.response.statusText, status: error.response.status }
    });
  }
};
