import * as actions from "./constant";
const initialState = {
  error: false,
  loading: false,
  message: false,
  isAdded: false,
  isDeleted: false,
  isEnable: false,
  profile: {},
};

export default (state = initialState, action) => {
  switch (action.type) {
    case actions.GET_PROFILE_INITIATED:
      return {
        ...state,
        message: false,
        error: false,
        loading: true,
      };
    case actions.GET_PROFILE_SUCCESS:
      return {
        ...state,
        loading: false,
        error: false,
        profile: action.payload.data,
      };
    case actions.GET_PROFILE_ERROR:
      return {
        ...state,
        loading: false,
        error: true,
        message: action.error,
      };
    default:
      return state;
  }
};
