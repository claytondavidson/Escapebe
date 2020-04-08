import axios from 'axios';
import { Types } from './types';
import { Dispatch } from 'redux';

const { GET_DASHBOARD, DASHBOARD_ERROR, GET_DASHBOARDS, CLEAR_MEMBER } = Types;

export interface CurrentDashboardAction {
  type: Types.GET_DASHBOARD | Types.DASHBOARD_ERROR;
}

export interface RetrieveDashboardsAction {
  type: Types.CLEAR_MEMBER | Types.GET_DASHBOARDS | Types.DASHBOARD_ERROR;
}

export const getCurrentDashboard = () => async (dispatch: Dispatch) => {
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

export const getDashboards = () => async (dispatch: Dispatch) => {
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

export const getDashboardById = (memberId) => async (dispatch: Dispatch) => {
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

export const createDashboard = (dashboardData, history) => async (
  dispatch: Dispatch
) => {
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
