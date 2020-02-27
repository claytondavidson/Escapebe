import axios from 'axios';

import { GET_GROUPS, GROUP_ERROR } from './types';

export const getGroups = () => async dispatch => {
  try {
    const res = await axios.get('/api/groups');

    dispatch({
      type: GET_GROUPS,
      payload: res.data
    });
  } catch (error) {
    dispatch({
      type: GROUP_ERROR,
      payload: { msg: error.response.statusText, status: error.response.status }
    });
  }
};
