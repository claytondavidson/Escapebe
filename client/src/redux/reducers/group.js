import { GET_GROUPS, GROUP_ERROR } from '../actions/types';

const initialState = {
  groups: [],
  group: null,
  loading: true,
  error: {}
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
    case GROUP_ERROR:
      return {
        ...state,
        error: payload,
        loading: false
      };
    default:
      return state;
  }
}
