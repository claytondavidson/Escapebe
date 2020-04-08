import axios from 'axios';

import {
  GET_GROUPS,
  GROUP_ERROR,
  CREATE_GROUP,
  GET_GROUP,
  ADD_POST,
  POST_ERROR,
  GET_POST,
  ADD_COMMENT,
  UPVOTE_POST,
} from './types';

export const getGroups = () => async (dispatch) => {
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

export const createGroup = (formData) => async (dispatch) => {
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

export const getGroup = (id) => async (dispatch) => {
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

export const getPost = (group_id, post_id) => async (dispatch) => {
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

export const addPost = (groupId, formData) => async (dispatch) => {
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

export const addComment = (groupId, postId, formData) => async (dispatch) => {
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

export const upvotePost = (groupId, id) => async (dispatch) => {
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
