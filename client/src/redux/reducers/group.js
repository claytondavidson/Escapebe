import {
  GET_GROUPS,
  GROUP_ERROR,
  CREATE_GROUP,
  GET_GROUP,
  ADD_POST,
  GET_POST,
  ADD_COMMENT
} from '../actions/types';

const initialState = {
  groups: [],
  group: null,
  loading: true,
  error: {},
  post: null,
  comments: null
};

export default function(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case GET_GROUPS:
      return {
        ...state,
        groups: payload,
        loading: false
      };
    case GET_GROUP:
      return {
        ...state,
        group: payload,
        loading: false
      };
    case CREATE_GROUP:
      return {
        ...state,
        groups: [...state.groups, payload],
        loading: false
      };
    case GROUP_ERROR:
      return {
        ...state,
        error: payload,
        loading: false
      };
    case ADD_POST:
      return {
        ...state,
        group: { ...state.group, posts: payload },
        loading: false
      };
    case GET_POST:
      return {
        ...state,
        post: payload,
        loading: false
      };
    case ADD_COMMENT:
      return {
        ...state,
        group: { ...state.group, ...state.post, comments: payload },
        loading: false
      };
    default:
      return state;
  }
}
