import axios from 'axios';

import { Types } from './types';
import { Dispatch } from 'redux';

const {
  GET_GROUPS,
  GET_GROUP,
  CREATE_GROUP,
  GROUP_ERROR,
  CLEAR_GROUP,
  ADD_POST,
  POST_ERROR,
  GET_POST,
  CLEAR_POST,
  ADD_COMMENT,
  UPVOTE_POST,
} = Types;

export const getGroups = () => async (dispatch: Dispatch) => {
  try {
    const res = await axios.get('/api/groups');

    dispatch({
      type: GET_GROUPS,
      payload: res.data,
    });
  } catch (error) {
    dispatch({
      type: GROUP_ERROR,
      payload: {
        msg: error.response.statusText,
        status: error.response.status,
      },
    });
  }
};

export const createGroup = (formData) => async (dispatch: Dispatch) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };
  try {
    const res = await axios.post('/api/groups', formData, config);

    dispatch({
      type: CREATE_GROUP,
      payload: res.data,
    });
  } catch (error) {
    dispatch({
      type: GROUP_ERROR,
      payload: {
        msg: error.response.statusText,
        status: error.response.status,
      },
    });
  }
};

export const getGroup = (id) => async (dispatch: Dispatch) => {
  dispatch({ type: CLEAR_GROUP });
  try {
    const res = await axios.get(`/api/groups/${id}`);

    dispatch({
      type: GET_GROUP,
      payload: res.data,
    });
  } catch (error) {
    dispatch({
      type: GROUP_ERROR,
      payload: {
        msg: error.response.statusText,
        status: error.response.status,
      },
    });
  }
};

export const getPost = (group_id, post_id) => async (dispatch: Dispatch) => {
  dispatch({ type: CLEAR_POST });
  try {
    const res = await axios.get(`/api/groups/${group_id}/${post_id}`);

    dispatch({
      type: GET_POST,
      payload: res.data,
    });
  } catch (error) {
    dispatch({
      type: POST_ERROR,
      payload: {
        msg: error.response.statusText,
        status: error.response.status,
      },
    });
  }
};

export const addPost = (groupId, formData) => async (dispatch: Dispatch) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };
  try {
    const res = await axios.post(
      `/api/groups/post/${groupId}`,
      formData,
      config
    );

    dispatch({
      type: ADD_POST,
      payload: res.data,
    });
  } catch (error) {
    dispatch({
      type: POST_ERROR,
      payload: {
        msg: error.response.statusText,
        status: error.response.status,
      },
    });
  }
};

export const addComment = (groupId, postId, formData) => async (
  dispatch: Dispatch
) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };
  try {
    const res = await axios.post(
      `/api/groups/comment/${groupId}/${postId}`,
      formData,
      config
    );

    dispatch({
      type: ADD_COMMENT,
      payload: res.data,
    });
  } catch (error) {
    dispatch({
      type: POST_ERROR,
      payload: {
        msg: error.response.statusText,
        status: error.response.status,
      },
    });
  }
};

export const upvotePost = (groupId, id) => async (dispatch: Dispatch) => {
  try {
    const res = await axios.put(`/api/groups/upvote/${groupId}/${id}`);

    dispatch({
      type: UPVOTE_POST,
      payload: { id, upvotes: res.data },
    });
  } catch (error) {
    dispatch({
      type: POST_ERROR,
      payload: {
        msg: error.response.statusText,
        status: error.response.status,
      },
    });
  }
};
