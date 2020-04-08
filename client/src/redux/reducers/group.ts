import { Types } from '../actions/types';

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

const initialState = {
  groups: [],
  group: null,
  loading: true,
  error: {},
  post: null,
  comments: null,
};

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case GET_GROUPS:
      return {
        ...state,
        groups: payload,
        loading: false,
      };
    case GET_GROUP:
      return {
        ...state,
        group: payload,
        loading: false,
      };
    case CREATE_GROUP:
      return {
        ...state,
        groups: [...state.groups, payload],
        loading: false,
      };
    case GROUP_ERROR:
      return {
        ...state,
        error: payload,
        loading: false,
      };
    case CLEAR_GROUP:
      return {
        ...state,
        group: null,
        loading: false,
      };
    case ADD_POST:
      return {
        ...state,
        group: { ...state.group, posts: payload },
        loading: false,
      };
    case POST_ERROR:
      return {
        ...state,
        error: payload,
        loading: false,
      };
    case GET_POST:
      return {
        ...state,
        post: payload,
        loading: false,
      };
    case CLEAR_POST:
      return {
        ...state,
        post: null,
        loading: false,
      };
    case ADD_COMMENT:
      return {
        ...state,
        post: { ...state.post, comments: payload },
        loading: false,
      };
    case UPVOTE_POST:
      return {
        ...state,
        posts: state.group.posts.map((post) =>
          post._id === payload.id ? { ...post, upvotes: payload.upvotes } : post
        ),
        loading: false,
      };
    default:
      return state;
  }
}
